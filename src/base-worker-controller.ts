import { Morphi } from 'morphi';
//#region @backend
import { TnpDB } from 'tnp-db';
import { Project } from './project';
import { BootstrapWorker } from './bootsrap-worker.backend';
//#endregion
import { WorkerProcessClass } from './worker-process-class';


@Morphi.Controller()
export class BaseWorkerController extends WorkerProcessClass
  //#region @backend
  implements Morphi.BASE_CONTROLLER_INIT
//#endregion
{
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
    return async (req, res) => 'hello';
  }

  helloObj(): Morphi.Response<any> {
    //#region @backendFunc
    return async (req, res) => { helo: 'asd' };
    //#endregion
  }

  @Morphi.Http.GET()
  allprojects(): Morphi.Response<any> {
    //#region @backendFunc
    return async (req, res) => {
      const db = await TnpDB.Instance();
      const projects = (await db.getProjects()).map(p => {
        return Project.From(p.locationOfProject);
      });
      return projects;
    }
    //#endregion
  }

  async initExampleDbData() {
    console.log('Hello from worker controller init funciton')
  }

}

//#region @backend
export default BootstrapWorker.bootstrap(BaseWorkerController);
//#endregion
