import { Morphi } from 'morphi';
import { TnpDB } from 'tnp-db';
import { CLASS } from 'typescript-class-helpers';
import { Helpers } from 'tnp-helpers';
import * as _ from 'lodash';

export class WorkersFactor {

  private static async runAppFromFile() {

  }

  public static async create<T = any>(classFN: Function, entities: Function[], autokill = false) {
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
    return {
      host,
      port: servicePort,
      exporessApp: app,
      instance: _.first(controllers) as T
    }
  }

}
