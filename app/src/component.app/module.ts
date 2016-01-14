/// <reference path='../../../typings/tsd.d.ts' />
'use strict';

import * as angular from 'angular';
import {LayoutRoutesConfig} from './routes';

import '../_proof.of.concepts/module';

let appModule: ng.IModule = angular.module('app.component', [
    'app.poc'
]);

appModule
  .config(LayoutRoutesConfig)
  .run(['$rootScope', '$state', function($rootScope, $state) {

      $rootScope.$on('$stateChangeStart', function(evt, to, params) {
          if (to.redirectTo) {
              evt.preventDefault();
              $state.go(to.redirectTo, params);
          }
      });

  }]);

export {appModule};
