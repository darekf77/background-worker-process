import { WorkersFactor } from './workers-factory.backend';
import { CLASS } from 'typescript-class-helpers';
import { BaseWorkerController } from './base-worker-controller';
import { BaseWorkerChildController } from './base-worker-child-controller';


export async function mainProcess() {
  const entities = [
    CLASS.getBy('Project')
  ];


  const w1 = await WorkersFactor.create<BaseWorkerController>(BaseWorkerController, entities);
  const w2 = await WorkersFactor.create<BaseWorkerController>(BaseWorkerChildController, entities);

  const projects = (await w1.instance.allprojects().received);

}
