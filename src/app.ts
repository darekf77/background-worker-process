//#region @backend
import { mainProcess } from './main-process.backend';
//#endregion

export default async function () {
  console.log('hello!');
  //#region @backend
  await mainProcess();
  //#endregion
}

