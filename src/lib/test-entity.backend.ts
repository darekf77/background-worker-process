
//#region @notForNpm
import { Morphi as Firedev } from 'morphi';

@Firedev.Entity({
  className: 'TestEntity'
})
export class TestEntity extends Firedev.Base.Entity<any> {

  static by(id: number) {
    return new TestEntity(id);
  }
  constructor(
    public id: number
  ) {
    super();
  }

}


@Firedev.Entity({
  className: 'TestEntity2'
})
export class TestEntity2 extends TestEntity {
  static by(id: number) {
    return new TestEntity2(id);
  }
}
//#endregion
