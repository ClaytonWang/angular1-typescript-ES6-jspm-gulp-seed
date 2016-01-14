import {AboutDirectiveController} from './about.directive.controller';

describe('About', function() {

  let scope = {};
  let about = new AboutDirectiveController(scope);

  it('Should add up', function() { expect(about.addUp(4, 5)).toBe(9); });

});
