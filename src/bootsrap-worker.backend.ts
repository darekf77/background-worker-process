import * as _ from 'lodash';
import { Morphi } from 'morphi';
import { WorkerProcessClass } from './worker-process-class';

export class BootstrapWorker {

  static readonly READY_MESSAGE = 'I am ready process worker';

  static bootstrap(classFN: typeof WorkerProcessClass, entities = []) {

    return async (port) => {
      const host = `http://localhost:${port}`
      const { controllers, app, connection } = await Morphi.init({
        host,
        controllers: [classFN],
        entities,
        mode: 'backend-only'
      }) as any;
      const singleton = _.first(controllers) as WorkerProcessClass;
      console.log(`hello from '${singleton.filename}`)
      console.log(BootstrapWorker.READY_MESSAGE + ` on pid: ${process.pid}`);
      return {
        controllers, app, connection
      }
    }
  }

}
