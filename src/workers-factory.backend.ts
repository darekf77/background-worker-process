import * as path from 'path';
import { Morphi } from 'morphi';
import { TnpDB } from 'tnp-db';
import { CLASS } from 'typescript-class-helpers';
import { Helpers, Project } from 'tnp-helpers';
import * as _ from 'lodash';
import * as vm from 'vm';
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

    const { controllers, app } = await Morphi.init({
      host,
      mode: 'remote-backend',
      controllers: [classFN],
      entities
    }) as any;


    const singleton = _.first(controllers) as WorkerProcessClass;
    const { URL } = require('url');
    // @ts-ignore
    singleton['host'] = new URL(host);
    const nearestProj = Project.nearestTo(singleton.filename);
    const realtivePathToFile = singleton.filename.replace(nearestProj.location, '');
    const cwdForWorker = singleton.filename.replace(realtivePathToFile, '');
    const command = `npm-run ts-node run.js --RELATIVEPATHoverride=${realtivePathToFile} --port ${servicePort}`;
    const proc = Helpers.run(command, { cwd: cwdForWorker }).async();
    await Helpers.waitForMessegeInStdout(proc, BootstrapWorker.READY_MESSAGE);


    return {
      host,
      port: servicePort,
      instance: (singleton as any) as T,
    }
  }

}




//#region context text
// Helpers.run(``)


    // const sandbox = {
    //   require,
    //   classFN,
    //   host,
    //   entities
    // }
    // const script = new vm.Script(`
    // const Morphi = require('morphi').Morphi;
    // const result = Morphi.init({
    //   host,
    //   mode: 'remote-backend',
    //   controllers: [classFN],
    //   entities
    // });
    // this.result = result;
    // `);

    // const context = vm.createContext(sandbox) as any;
    // // context.
    // script.runInContext(context);

//#endregion
