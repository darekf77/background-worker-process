import { Morphi } from 'morphi';

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
    return new Promise(async (resolve, reject) => {
      let isResolve = false;
      const promises = [
        new Promise(resolve => setTimeout(() => {
          if (!isResolve) {
            isResolve = true;
            reject(`[worker-process-class] Worker healty check timeout`)
          }
          resolve()
        }, 1000)),
        async () => {
          const res = await this.__worker_is_healty__().received;
          return res.body.booleanValue;
        }
      ]
      try {
        const [__, v2] = (await Promise.all(promises)) as boolean[];
        if (!isResolve) {
          isResolve = true;
          resolve(v2);
        }
      } catch (error) {
        reject(error);
      }
    })
  }

  readonly host: URL;
}
