import { Morphi } from 'morphi';

export class WorkersFactor {

  public static async create<T = any>(classFN: Function, entities: Function[]) {
    const daemonPort = 0; /// await this.getDaemonPort();
    const host = `http://localhost:${daemonPort}`;
    // await Morphi.init({
    //   host,
    //   onlyForBackendRemoteServerAccess: true,
    //   controllers: [DbDaemonController],
    //   entities: entities
    // }) as any;
    return {
      host,
      port: daemonPort,
      instance: void 0 as T
    }
  }

}
