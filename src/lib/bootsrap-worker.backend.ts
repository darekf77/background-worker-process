import { _ } from 'tnp-core';
import { Morphi } from 'morphi';
import { WorkerProcessClass } from './worker-process-class';

export class BootstrapWorker {

  static readonly READY_MESSAGE = 'I am ready process worker';

  static bootstrap(classFN: typeof WorkerProcessClass, entities = []) {

    return async (port) => {
      const host = `http://localhost:${port}`;
      const controllers = [classFN];

      const context = await Morphi.init({
        host,
        controllers,
        entities,
        mode: 'backend/frontend-worker'
      }) as any;
      const singleton = _.first(context.controllers) as WorkerProcessClass;
      console.log(`hello from '${singleton.filename}`)
      console.log(BootstrapWorker.READY_MESSAGE + ` on pid: ${process.pid}`);
      return context;
    }
  }

}
