'use strict';

import * as angular from 'angular';

import {PositionFactory} from './position.factory';

let positionFactoryModule: ng.IModule =
  angular.module('app.position.factory', []);

PositionFactory.factory.$inject = ['$document', '$window'];

positionFactoryModule.factory('uixPosition', PositionFactory.factory);

export {positionFactoryModule};
