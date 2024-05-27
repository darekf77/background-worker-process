//#region @notForNpm
import { WorkersFactor } from './workers-factory.backend';
import { BaseWorkerController } from './base-worker-controller.backend';
import { BaseWorkerChildController } from './base-worker-child-controller.backend';
import { Project, SubProject } from './project';
// import { FiredevPorts } from 'firedev-ports';
import { CLASS } from 'typescript-class-helpers';
import { TestEntity, TestEntity2 } from './test-entity.backend';
import { Helpers } from 'tnp-helpers';

//#endregion
export async function mainProcess(args: string) {
  //#region @notForNpm
  let { killAlreadyRegisterd = false } = Helpers.cliTool.getPramsFromArgs<{ killAlreadyRegisterd: boolean; }>(args);

  // const db = await FiredevPorts.instance;

  // global['hideLog'] = false;
  // console.log(`

  // killAlreadyRegisterd: "${killAlreadyRegisterd}"
  // killAlreadyRegisterd typeof: "${typeof killAlreadyRegisterd}"

  // `)
  // process.exit(0)
  // const w1port = await db.registerUniqeServiceAndGetPort(CLASS.getName(BaseWorkerController)
  //   , killAlreadyRegisterd);

  // const w2port = await db.registerUniqeServiceAndGetPort(CLASS.getName(BaseWorkerChildController)
  //   , killAlreadyRegisterd);

  // const w1 = await WorkersFactor.create<BaseWorkerController>(
  //   BaseWorkerController, [Project, TestEntity], w1port, {
  //   killAlreadRegisteredProcess: false,
  //   startWorkerServiceAsChildProcess: killAlreadyRegisterd
  // });
  // const w2 = await WorkersFactor.create<BaseWorkerChildController>(
  //   BaseWorkerChildController, [SubProject, TestEntity2], w2port, {
  //   killAlreadRegisteredProcess: false,
  //   startWorkerServiceAsChildProcess: killAlreadyRegisterd
  // });


  // console.log(`w1 is working on host ${w1.host}`);
  // console.log(`w2 is working on host ${w2.host}`);
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


  // const c = new TestEntity(1);

  // Firedev.Realtime.Browser.listenChangesEntityObjy(c).subscribe(() => {
  //   console.log(`[main-process] external update for entity 1`)
  // });

  // const c2 = new TestEntity2(2);

  // Firedev.Realtime.Browser.listenChangesEntityObjy(c2).subscribe(() => {
  //   console.log(`[main-process] external update for entity 2`)
  // });


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
