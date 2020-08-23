import { Morphi } from 'morphi';

//#endregion
export class BootstrapWorker {

  static readonly READY_MESSAGE = 'I am ready process worker';

  static bootstrap(classFN, entities = []) {

    return async (port) => {
      const host = `http://localhost:${port}`
      const { controllers, app, connection } = await Morphi.init({
        host,
        controllers: [classFN],
        entities
      }) as any;
      return {
        controllers, app, connection
      }
    }
  }

}
