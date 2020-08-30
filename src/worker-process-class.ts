import { Morphi } from 'morphi';
import { Helpers } from 'tnp-helpers';

export abstract class WorkerProcessClass {
  //#region @backend
  abstract get filename(): string;
  //#endregion

  @Morphi.Http.GET('/workerishealty')
  protected __worker_is_healty__(): Morphi.Response<boolean> {
    //#region @backendFunc
    return {
      send: true
    }
    //#endregion
  }

  /**
   * <<< Internal function >>> to check if worker is healty
   * You can change behavior of this method by
   * overrding function <strong> __worker_is_healty__</strong>
   */
  public get $$healty() {
    return new Promise(async (resolve) => {
      let isResolve = false;
      setTimeout(() => {
        if (!isResolve) {
          isResolve = true;
          Helpers.log(`[worker-process-class] Worker healty check timeout`);
          resolve(false);
        }
      }, 10000);
      try {
        const workerIsOk = (await this.__worker_is_healty__().received).body.booleanValue;
        if (!isResolve) {
          isResolve = true;
          resolve(workerIsOk);
        }
      } catch (error) {
        if (!isResolve) {
          isResolve = true;
          Helpers.log(`[worker-process-class] Not able to acces worker with http: ${error.message}` );
          resolve(false)
        }
      }
    })
  }

  readonly host: URL;
}
