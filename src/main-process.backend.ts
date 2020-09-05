//#region @notForNpm
import { WorkersFactor } from './workers-factory.backend';
import { BaseWorkerController } from './base-worker-controller.backend';
import { BaseWorkerChildController } from './base-worker-child-controller.backend';
import { Project } from './project';
import { TnpDB } from 'tnp-db';
import { CLASS } from 'typescript-class-helpers';
import { Morphi } from 'morphi';
import { TestEntity } from './test-entity.backend';



//#endregion
export async function mainProcess() {
  //#region @notForNpm
  const entities = [
    Project,
    TestEntity
  ].filter(f => !!f);
  const killAlreadyRegisterd = false;
  const db = await TnpDB.Instance();
  const portsManager = await db.portsManaber;

  const w1port = await portsManager.registerOnFreePort({
    name: CLASS.getName(BaseWorkerController)
  }, { killAlreadyRegisterd });

  const w2port = await portsManager.registerOnFreePort({
    name: CLASS.getName(BaseWorkerChildController)
  }, { killAlreadyRegisterd });

  const w1 = await WorkersFactor.create<BaseWorkerController>(
    BaseWorkerController, entities, w1port);
  const w2 = await WorkersFactor.create<BaseWorkerChildController>(
    BaseWorkerChildController, entities, w2port);


  console.log(`w1 is working on host ${w1.host}`);
  console.log(`w2 is working on host ${w2.host}`);
  // try {
  //   const data = await w1.instance.hello().received;
  //   console.log(data.body.text);
  // } catch (error) {
  //   console.error(error)
  // }
  // try {
  //   const data = await w2.instance.hello().received;
  //   console.log(data.body.text);
  // } catch (error) {
  //   console.error(error)
  // }


  const c = new TestEntity(1);
  c.subscribeRealtimeUpdates({
    callback: (a) => {
      console.log(`[main-process] updating ${this.id}`, a?.body.text)
    }
  });

  const c2 = new TestEntity(2);
  c2.subscribeRealtimeUpdates({
    callback: (a) => {
      console.log(`[main-process] updating ${this.id}`, a?.body.text);
    }
  });

  // try {
  //   const data = await w1.instance.allprojects().received;
  //   console.log(data.body.json);
  // } catch (error) {
  //   console.error(error)
  // }

  // console.log((await w1.instance.hello().received).body.text);
  // console.log((await w2.instance.hello().received).body.text);
  // const projects = (await w1.instance.allprojects().received);
  // process.exit(0)
  //#endregion
}

