
//#region @notForNpm
import { Morphi } from 'morphi';

@Morphi.Entity({
  className: 'TestEntity'
})
export class TestEntity extends Morphi.Base.Entity<any, any> {

  static by(id: number) {
    return new TestEntity(id);
  }
  constructor(
    public id: number
  ) {
    super();
  }

}


@Morphi.Entity({
  className: 'TestEntity2'
})
export class TestEntity2 extends TestEntity {
  static by(id: number) {
    return new TestEntity2(id);
  }
}
//#endregion
