//#region @backend
import { mainProcess } from './main-process.backend';
//#endregion

export default async function (port, args) {
  console.log('hello!');
  //#region @backend
  await mainProcess(args);
  //#endregion
}

