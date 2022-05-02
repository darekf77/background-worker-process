import { crossPlatformPath } from 'tnp-core';
import { Morphi as Firedev } from 'morphi';
import { BootstrapWorker } from './bootsrap-worker.backend';
import { WorkerProcessClass } from './worker-process-class';
//#region @notForNpm
import { TestEntity } from './test-entity.backend';
//#endregion
import { CLASS } from 'typescript-class-helpers';


@Firedev.Controller({
  className: 'BaseWorkerController',
  // entity: TestEntity
})
export class BaseWorkerController extends WorkerProcessClass implements Firedev.BASE_CONTROLLER_INIT {

  get filename() {
    return crossPlatformPath(__filename);
  }

  readonly args: string[] = [];

  @Firedev.Http.GET('/')
  html(): Firedev.Response {
    return async (req, res) => `<h1> hello worker </h1>`;
  }

  @Firedev.Http.GET()
  hello(): Firedev.Response {
    return async (req, res) => 'hello';
  }

  helloObj(): Firedev.Response<any> {

    return async (req, res) => { helo: 'asd' };

  }

  @Firedev.Http.GET()
  kill(): Firedev.Response<any> {
    process.exit(0)
  }

  @Firedev.Http.GET('/info')
  info(): Firedev.Response<any> {
    return async (req, res) => {
      return JSON.stringify(this.updates);
    }
  }

  // TODO
  //  //#region @notForNpm
  //  @Firedev.Http.GET()
  //  allprojects(): Firedev.Response<any> {

  //    return async (req, res) => {
  //      const db = await TnpDB.Instance();
  //      const projects = (await db.getProjects()).map(p => {
  //        return Project.From(p.locationOfProject);
  //      });
  //      return projects;
  //    }

  //  }
  //  //#endregion

  async initExampleDbData(isWorker?: boolean) {
    if (isWorker) {
      setTimeout(() => {
        this.updateRealtime();
      }, 2000);
    }
  }

  updates = [];

  updateRealtime() {
    //#region @notForNpm
    const id = 1;
    Firedev.Realtime.Server.TrigggerEntityChanges(TestEntity.by(id));
    const msg = `realtime update of (${CLASS.getName(TestEntity)}, id:${id}).. from worker ${CLASS.getNameFromObject(this)}`;
    this.updates.push(`[${(new Date).getTime()}] ${msg}`)
    setTimeout(() => {
      this.updateRealtime();
    }, 2000);
    // process.stdout.on('data', (data) => {
    //   this.updates.push(data?.toString());
    // })
    //#endregion
  }



}

export default BootstrapWorker.bootstrap(BaseWorkerController);
