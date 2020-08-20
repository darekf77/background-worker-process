import { Morphi } from 'morphi';
import { BaseWorkerController } from './base-worker-controller';

@Morphi.Controller()
export class BaseWorkerChildController extends BaseWorkerController {

  @Morphi.Http.GET()
  hello(): Morphi.Response {
    return async (req, res) => 'hello from child worker!';
  }

  hello2(): Morphi.Response {
    return async (req, res) => 'hello 2222!';
  }

}
