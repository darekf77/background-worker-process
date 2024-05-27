
//#region @notForNpm

// @Firedev.Entity({
//   className: 'TestEntity'
// })
export class TestEntity {

  static by(id: number) {
    return new TestEntity(id);
  }
  constructor(
    public id: number
  ) {
  }

}


// @Firede'v.Entity({
//   className: 'TestEntity2'
// })'
export class TestEntity2 extends TestEntity {
  static by(id: number) {
    return new TestEntity2(id);
  }
}
//#endregion
