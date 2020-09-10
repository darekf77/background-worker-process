import { Morphi } from 'morphi';
import { CLASS } from 'typescript-class-helpers';
import { Helpers, Project } from 'tnp-helpers';
import * as _ from 'lodash';
import { WorkerProcessClass } from './worker-process-class';
import { BootstrapWorker } from './bootsrap-worker.backend';
import chalk from 'chalk';

export interface WorkersFactoryOptions {
  /**
   * default true
   */
  startWorkerServiceAsChildProcess?: boolean;
  killAlreadRegisteredProcess?: boolean;
  args?: string[] | string;
  disabledRealtime?: boolean;
}

export class WorkersFactor {

  public static async create<T extends WorkerProcessClass = any>(
    classFN: Function,
    entities: Function[],
    servicePort: number,
    options?: WorkersFactoryOptions,
  ) {

    if (!options) {
      options = {};
    }
    if (_.isUndefined(options.startWorkerServiceAsChildProcess)) {
      options.startWorkerServiceAsChildProcess = true;
    }
    if (_.isUndefined(options.killAlreadRegisteredProcess)) {
      options.killAlreadRegisteredProcess = true;
    }
    if (_.isUndefined(options.disabledRealtime)) {
      options.disabledRealtime = false;
    }
    const { startWorkerServiceAsChildProcess,
      killAlreadRegisteredProcess,
      disabledRealtime,
    } = options;

    if (killAlreadRegisteredProcess) {
      await Helpers.killProcessByPort(servicePort);
    }

    const nameOfWorker = CLASS.getName(classFN);
    if (!nameOfWorker || nameOfWorker === '') {
      Helpers.error(`[b-w-p] Wrong name for class.. not able to create work`);
    }

    const host = `http://localhost:${servicePort}`;

    const { controllers, app } = await Morphi.init({
      host,
      mode: 'remote-backend',
      controllers: [classFN],
      entities,
      disabledRealtime
    }) as any;

    const singleton = _.first(controllers) as WorkerProcessClass;
    const { URL } = require('url');
    // @ts-ignore
    singleton['host'] = new URL(host);
    if (startWorkerServiceAsChildProcess) {
      console.log(`STARING SERVIVCE FOR ${nameOfWorker}`)
      const nearestProj = Project.nearestTo(singleton.filename, { onlyOutSideNodeModules: true });
      const realtivePathToFile = singleton.filename.replace(nearestProj.location, '');
      const cwdForWorker = singleton.filename.replace(realtivePathToFile, '');

      const command = `npm-run ts-node run.js --RELATIVEPATHoverride=${realtivePathToFile} --port ${servicePort}`;
      const proc = Helpers.run(command, { cwd: cwdForWorker }).async(true);
      console.log(`[worker-factor] process ${proc.pid} for "${nameOfWorker}"`)
      await Helpers.waitForMessegeInStdout(proc, BootstrapWorker.READY_MESSAGE);
    }
    console.log(`Worker ${chalk.bold(nameOfWorker)} can be accessed:

    ${Morphi.getHttpPathBy<any>(classFN as any, servicePort, 'info')}

    `);

    return {
      host,
      port: servicePort,
      instance: (singleton as any) as T,
    }
  }

}
