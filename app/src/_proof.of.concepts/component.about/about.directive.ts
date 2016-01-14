
'use strict';

import {AboutDirectiveController} from './about.directive.controller';


class AboutDirective {
  static $inject = [];

  public restrict = 'E';
  public scope = {};
  public controllerAs = 'about';
  public bindToController = true;
  public templateUrl = 'src/_proof.of.concepts/component.about/about.html';

  public controller = AboutDirectiveController.controllerFactory;

  static factory() { return new AboutDirective(); }
}

export {AboutDirective};
