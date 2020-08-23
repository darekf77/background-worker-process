import { Morphi } from 'morphi';
//#region @backend
import { TnpDB } from 'tnp-db';
import { Project } from 'tnp-helpers';
import { BootstrapWorker } from './bootsrap-worker.backend';
//#endregion
import { WorkerProcessClass } from './worker-process-class';


@Morphi.Controller()
export class BaseWorkerController extends WorkerProcessClass {
  //#region @backend
  get filename() {
    return __filename;
  }
  //#endregion

  @Morphi.Http.GET()
  hello(): Morphi.Response {
    return async (req, res) => 'hello';
  }

  @Morphi.Http.GET()
  allprojects(): Morphi.Response<any> {
    //#region @backendFunc
    return async (req, res) => {
      const db = TnpDB.InstanceSync;
      const projects = (await db.getProjects()).map(p => {
        return Project.From(p.locationOfProject);
      });
      return projects;
    }
    //#endregion
  }

}

//#region @backend
export default BootstrapWorker.bootstrap(BaseWorkerController);
//#endregion
