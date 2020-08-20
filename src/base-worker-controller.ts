import { Morphi } from 'morphi';
//#region @backend
import { TnpDB } from 'tnp-db';
import { Project } from 'tnp-helpers';
//#endregion

@Morphi.Controller()
export class BaseWorkerController {

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
