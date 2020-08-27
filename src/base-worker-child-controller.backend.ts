import { Morphi } from 'morphi';
import { BaseWorkerController } from './base-worker-controller.backend';
import { BootstrapWorker } from './bootsrap-worker.backend';

@Morphi.Controller()
export class BaseWorkerChildController extends BaseWorkerController {
  get filename() {
    return __filename;
  }

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

export default BootstrapWorker.bootstrap(BaseWorkerChildController);

