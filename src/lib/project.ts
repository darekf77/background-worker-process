import { Morphi } from 'morphi';
import { Project as BaseProject } from 'tnp-helpers';

@Morphi.Entity({
  className: 'Project'
})
export class Project extends BaseProject {

}

@Morphi.Entity({
  className: 'SubProject'
})
export class SubProject extends Project {

}
