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
  args?: string[] | string;
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
    const { startWorkerServiceAsChildProcess } = options;

    const name = CLASS.getName(classFN);
    if (!name || name === '') {
      Helpers.error(`[b-w-p] Wrong name for class.. not able to create work`);
    }

    const host = `http://localhost:${servicePort}`;

    const { controllers, app } = await Morphi.init({
      host,
      mode: 'remote-backend',
      controllers: [classFN],
      entities
    }) as any;

    const singleton = _.first(controllers) as WorkerProcessClass;
    const { URL } = require('url');
    // @ts-ignore
    singleton['host'] = new URL(host);
    if (startWorkerServiceAsChildProcess) {
      const nearestProj = Project.nearestTo(singleton.filename, { onlyOutSideNodeModules: true });
      const realtivePathToFile = singleton.filename.replace(nearestProj.location, '');
      const cwdForWorker = singleton.filename.replace(realtivePathToFile, '');

      await Helpers.killProcessByPort(servicePort);

      const command = `npm-run ts-node run.js --RELATIVEPATHoverride=${realtivePathToFile} --port ${servicePort}`;
      const proc = Helpers.run(command, { cwd: cwdForWorker }).async();
      await Helpers.waitForMessegeInStdout(proc, BootstrapWorker.READY_MESSAGE);
    }
    Helpers.log(`Worker ${chalk.bold(name)} can be accessed:

    ${host}/WorkerProcessClass/DbDaemonController/info

    `);

    return {
      host,
      port: servicePort,
      instance: (singleton as any) as T,
    }
  }

}
