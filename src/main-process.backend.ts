import { WorkersFactor } from './workers-factory.backend';
import { BaseWorkerController } from './base-worker-controller';
import { BaseWorkerChildController } from './base-worker-child-controller';
import { Project } from './project';

export async function mainProcess() {
  const entities = [
    Project
  ].filter(f => !!f);
  const w1 = await WorkersFactor.create<BaseWorkerController>(BaseWorkerController, entities, true);
  const w2 = await WorkersFactor.create<BaseWorkerChildController>(BaseWorkerChildController, entities, true);

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

  try {
    const data = await w1.instance.allprojects().received;
    console.log(data.body.json);
  } catch (error) {
    console.error(error)
  }

  // console.log((await w1.instance.hello().received).body.text);
  // console.log((await w2.instance.hello().received).body.text);
  // const projects = (await w1.instance.allprojects().received);

}
