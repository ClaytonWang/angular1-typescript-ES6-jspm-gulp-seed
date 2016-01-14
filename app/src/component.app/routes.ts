/// <reference path='../../../typings/tsd.d.ts' />
'use strict';

LayoutRoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function LayoutRoutesConfig(
    $stateProvider: any, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
  'use strict';

  $stateProvider

      .state('app', {
        abstract: true,
        redirectTo: 'app.home',
        templateUrl: 'src/component.app/app.html',
        url: '',
      });

  $urlRouterProvider.otherwise('/home');
}

export {LayoutRoutesConfig}
