import { Morphi } from 'morphi';
//#region @notForNpm
import { TnpDB } from 'tnp-db';
//#region
import { Project } from './project';
import { BootstrapWorker } from './bootsrap-worker.backend';
import { WorkerProcessClass } from './worker-process-class';


@Morphi.Controller()
export class BaseWorkerController extends WorkerProcessClass implements Morphi.BASE_CONTROLLER_INIT {

  get filename() {
    return __filename;
  }


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

  async initExampleDbData() {
    console.log('Hello from worker controller init funciton')
  }

}

export default BootstrapWorker.bootstrap(BaseWorkerController);
