import { crossPlatformPath } from 'tnp-core';
import { Morphi } from 'morphi';
//#region @notForNpm
import { TnpDB } from 'tnp-db';
//#endregion
import { Project } from './project';
import { BootstrapWorker } from './bootsrap-worker.backend';
import { WorkerProcessClass } from './worker-process-class';
//#region @notForNpm
import { TestEntity } from './test-entity.backend';
//#endregion
import { CLASS } from 'typescript-class-helpers';


@Morphi.Controller({
  className: 'BaseWorkerController',
  // entity: TestEntity
})
export class BaseWorkerController extends WorkerProcessClass implements Morphi.BASE_CONTROLLER_INIT {

  get filename() {
    return crossPlatformPath(__filename);
  }

  readonly args: string[] = [];

  @Morphi.Http.GET('/')
  html(): Morphi.Response {
    return async (req, res) => `<h1> hello worker </h1>`;
  }

  @Morphi.Http.GET()
  hello(): Morphi.Response {
    return async (req, res) => 'hello';
  }

  helloObj(): Morphi.Response<any> {

    return async (req, res) => { helo: 'asd' };

  }

  @Morphi.Http.GET()
  kill(): Morphi.Response<any> {
    process.exit(0)
  }

  @Morphi.Http.GET('/info')
  info(): Morphi.Response<any> {
    return async (req, res) => {
      return JSON.stringify(this.updates);
    }
  }

  //#region @notForNpm
  @Morphi.Http.GET()
  allprojects(): Morphi.Response<any> {

    return async (req, res) => {
      const db = await TnpDB.Instance();
      const projects = (await db.getProjects()).map(p => {
        return Project.From(p.locationOfProject);
      });
      return projects;
    }

  }
  //#endregion

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
    Morphi.Realtime.Server.TrigggerEntityChanges(TestEntity.by(id));
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
