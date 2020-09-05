import { Morphi } from 'morphi';
import { BaseWorkerController } from './base-worker-controller.backend';
import { BootstrapWorker } from './bootsrap-worker.backend';
import { TestEntity } from './test-entity.backend';
import { CLASS } from 'typescript-class-helpers';

@Morphi.Controller({
  className: 'BaseWorkerChildController',
  entity: TestEntity
})
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

  updateRealtime() {
    const id = 1;
    Morphi.Realtime.Server.TrigggerEntityChanges(TestEntity.by(id));
    console.log(`realtime update of ${id}.. from worker ${CLASS.getNameFromObject(this)}`);
    setTimeout(() => {
      this.updateRealtime();
    }, 2000);
  }

  async initExampleDbData() {
    console.log('Hello from child worker init funcitn')
    setTimeout(() => {
      // this.updateRealtime();
    }, 2000);
  }

}

export default BootstrapWorker.bootstrap(BaseWorkerChildController);
