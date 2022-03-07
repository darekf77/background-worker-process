import { crossPlatformPath } from 'tnp-core';
import { Morphi } from 'morphi';
import { BaseWorkerController } from './base-worker-controller.backend';
import { BootstrapWorker } from './bootsrap-worker.backend';
//#region @notForNpm
import { TestEntity, TestEntity2 } from './test-entity.backend';
//#endregion
import { CLASS } from 'typescript-class-helpers';

@Morphi.Controller({
  className: 'BaseWorkerChildController',
  // entity: TestEntity2
})
export class BaseWorkerChildController extends BaseWorkerController {
  get filename() {
    return crossPlatformPath(__filename);
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
    //#region @notForNpm
    const id = 2;
    Morphi.Realtime.Server.TrigggerEntityChanges(TestEntity2.by(id));
    const msg = `realtime update of (${CLASS.getName(TestEntity2)}, id:${id}).. from worker ${CLASS.getNameFromObject(this)}`;
    this.updates.push(`[${(new Date).getTime()}] ${msg}`)
    setTimeout(() => {
      this.updateRealtime();
    }, 2000);
    //#endregion
  }

  async initExampleDbData(isWorker?: boolean) {
    if (isWorker) {
      setTimeout(() => {
        this.updateRealtime();
      }, 2000);
    }
    // process.stdout.on('data', (data) => {
    //   this.updates.push(data?.toString());
    // })
  }

}

export default BootstrapWorker.bootstrap(BaseWorkerChildController);
