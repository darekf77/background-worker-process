import { Helpers } from 'tnp-helpers';

export abstract class WorkerProcessClass {
  //#region @backend
  abstract get filename(): string;
  //#endregion

  //#region worker is healty
  // @Firedev.Http.GET('/workerishealty')
  protected __worker_is_healty__() {
    //#region @backendFunc
    return {
      send: true
    }
    //#endregion
  }
  //#endregion

  /**
   * <<< Internal function >>> to check if worker is healty
   * You can change behavior of this method by
   * overrding function <strong> __worker_is_healty__</strong>
   */
  public get $$healty() {
    return false;
    // return new Promise(async (resolve) => {
    //   let isResolve = false;
    //   setTimeout(() => {
    //     if (!isResolve) {
    //       isResolve = true;
    //       Helpers.log(`[worker-process-class] Worker healty check timeout`);
    //       resolve(false);
    //     }
    //   }, 10000);
    //   try {
    //     const workerIsOk = (await this.__worker_is_healty__().received).body.booleanValue;
    //     if (!isResolve) {
    //       isResolve = true;
    //       resolve(workerIsOk);
    //     }
    //   } catch (error) {
    //     if (!isResolve) {
    //       isResolve = true;
    //       Helpers.log(`[worker-process-class] Not able to acces worker with http: ${error.message}`);
    //       resolve(false)
    //     }
    //   }
    // })
  }

}
