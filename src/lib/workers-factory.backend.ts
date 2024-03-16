import { Morphi as Firedev } from 'morphi';
import { CLASS } from 'typescript-class-helpers';
import { Helpers, BaseProject as Project } from 'tnp-helpers';
import { _ } from 'tnp-core';
import { WorkerProcessClass } from './worker-process-class';
import { BootstrapWorker } from './bootsrap-worker.backend';
import { CLI } from 'tnp-cli';

export interface WorkersFactoryOptions {
  /**
   * default true
   */
  startWorkerServiceAsChildProcess?: boolean;
  killAlreadRegisteredProcess?: boolean;
  args?: string[] | string;
  disabledRealtime?: boolean;
  preventSameContexts?: boolean;
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
    if (_.isUndefined(options.preventSameContexts)) {
      options.preventSameContexts = false;
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
      preventSameContexts,
    } = options;

    if (killAlreadRegisteredProcess) {
      await Helpers.killProcessByPort(servicePort);
    }

    const nameOfWorker = CLASS.getName(classFN);
    if (!nameOfWorker || nameOfWorker === '') {
      Helpers.error(`[b-w-p] Wrong name for class.. not able to create work`);
    }

    const host = `http://localhost:${servicePort}`;

    if (preventSameContexts) {
      Firedev.destroyContext(host);
    }

    const context = await Firedev.init({
      host,
      mode: 'remote-backend',
      controllers: [classFN],
      entities,
      disabledRealtime
    });

    const controllers = context.allControllersInstances;

    const singleton = _.first(controllers) as WorkerProcessClass;

    if (startWorkerServiceAsChildProcess) {
      // console.log(`STARING SERVIVCE FOR ${nameOfWorker}`)
      const nearestProj = Project.ins.nearestTo(singleton.filename, { onlyOutSideNodeModules: true });
      Helpers.log(`nearestProj.location: ${!nearestProj ? 'NOTHING!' : nearestProj.location}`)
      let realtivePathToFile = singleton.filename.replace(nearestProj.location, '');
      Helpers.log(`realtivePathToFile: ${realtivePathToFile}`)
      Helpers.log(`singleton.filename: ${singleton.filename}`)
      const cwdForWorker = singleton.filename.replace(realtivePathToFile, '');
      Helpers.log(`cwdForWorker: ${cwdForWorker}`)

      // const logFileName = `tmp-worker-log-${path.basename(singleton.filename.replace(/\.js$/, ''))}.txt`;
      if (process.platform === 'win32') {
        realtivePathToFile = realtivePathToFile.replace(/^\//, '');
      }
      const command = `npx ts-node run.js --RELATIVEPATHoverride=${realtivePathToFile} `
        + `--port ${servicePort} `
      // + `> ${logFileName}`;
      // console.log(`[worker-factor]
      // command for sub-process: ${command}
      // logFileName: ${logFileName}
      // `)
      const proc = Helpers.run(command, { cwd: cwdForWorker }).async(
        true
      );
      // proc.stdout.on(`data`, (a) => {
      //   console.log(`[${logFileName}] \n
      //   `+ a);
      // })
      Helpers.log(`[worker-factor] process ${proc.pid} for "${nameOfWorker}"`);
      if (process.platform === 'win32') {
        Helpers.info('[background-worker-process] look at external console for errors');
      } else {
        await Helpers.waitForMessegeInStdout(proc, BootstrapWorker.READY_MESSAGE);
      }
    }
    Helpers.log(`Worker ${CLI.chalk.bold(nameOfWorker)} can be accessed:

    ${Firedev.getHttpPathBy<any>(classFN as any, servicePort, 'info')}

    `);

    return {
      host,
      port: servicePort,
      instance: (singleton as any) as T,
      context
    }
  }

}
