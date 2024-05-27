import { _ } from 'tnp-core';
import { Firedev } from 'firedev';
import { WorkerProcessClass } from './worker-process-class';

export class BootstrapWorker {

  static readonly READY_MESSAGE = 'I am ready process worker';

  static bootstrap(classFN: typeof WorkerProcessClass, entities = []) {

    return async (port) => {
      const host = `http://localhost:${port}`;
      const controllers = [classFN];

      // const context = await Firedev.init({
      //   host,
      //   controllers,
      //   entities,
      //   mode: 'backend/frontend-worker'
      // }) as any;
      // const singleton = _.first(context.allControllersInstances) as WorkerProcessClass;
      // console.log(`hello from '${singleton.filename}`)
      // console.log(BootstrapWorker.READY_MESSAGE + ` on pid: ${process.pid}`);
      // return context;
    }
  }

}
