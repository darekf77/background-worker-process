import * as path from 'path';
import { Morphi } from 'morphi';
import { TnpDB } from 'tnp-db';
import { CLASS } from 'typescript-class-helpers';
import { Helpers, Project } from 'tnp-helpers';
import * as _ from 'lodash';
import { WorkerProcessClass } from './worker-process-class';
import { BootstrapWorker } from './bootsrap-worker.backend';


export class WorkersFactor {

  public static async create<T extends WorkerProcessClass = any>(classFN: Function, entities: Function[], autokill = false) {

    const db = await TnpDB.Instance();
    const name = CLASS.getName(classFN);
    if (!name || name === '') {
      Helpers.error(`[b-w-p] Wrong name for class.. not able to create work`);
    }
    const servicePort = await (await db.portsManaber).registerOnFreePort({
      name: CLASS.getName(classFN)
    }, autokill);
    const host = `http://localhost:${servicePort}`;
    // Helpers.run(``)
    const { controllers, app } = await Morphi.init({
      host,
      onlyForBackendRemoteServerAccess: true,
      controllers: [classFN],
      entities
    }) as any;

    const singleton = _.first(controllers) as WorkerProcessClass;
    const nearestProj = Project.nearestTo(singleton.filename);
    const realtivePathToFile = singleton.filename.replace(nearestProj.location, '');
    const cwdForWorker = singleton.filename.replace(realtivePathToFile, '');
    const proc = Helpers.run(`ts-node run.js --RELATIVEPATHoverride=${realtivePathToFile}`, { cwd: cwdForWorker }).async();
    await Helpers.waitForMessegeInStdout(proc, BootstrapWorker.READY_MESSAGE);

    return {
      host,
      port: servicePort,
      instance: (singleton as any) as T,
      proc
    }
  }

}
