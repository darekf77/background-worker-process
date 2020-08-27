import { Morphi } from 'morphi';
import { BaseWorkerController } from './base-worker-controller';
//#region @backend
import { BootstrapWorker } from './bootsrap-worker.backend';
//#endregion

@Morphi.Controller()
export class BaseWorkerChildController extends BaseWorkerController {

  //#region @backend
  get filename() {
    return __filename;
  }
  //#endregion

  @Morphi.Http.GET('/')
  html(): Morphi.Response {
    return async (req, res) => `<h1> hello worker </h1>`;
  }

  @Morphi.Http.GET()
  hello(): Morphi.Response {
    return async (req, res) => 'hello from child worker!';
  }

  hello2(): Morphi.Response {
    return async (req, res) => 'hello 2222!';
  }

  async initExampleDbData() {
    console.log('Hello from child worker init funcitn')
  }

}

//#region @backend
export default BootstrapWorker.bootstrap(BaseWorkerChildController);
//#endregion
