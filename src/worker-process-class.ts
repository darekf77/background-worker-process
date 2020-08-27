
export abstract class WorkerProcessClass {
  //#region @backend
  abstract get filename(): string;
  //#endregion
  readonly host: URL;
}
