/// <reference path='../../../../../typings/tsd.d.ts' />
'use strict';

BookShelfRoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function BookShelfRoutesConfig(
  $stateProvider: ng.ui.IStateProvider) {
  'use strict';

  /* tslint:disable */
  $stateProvider
    .state(
      'app.bookShelf.list',
      {
        url: '/list',
        views: {
          'bookShelf@app.bookShelf': {
            controller: 'app.poc.bookShelf.listController as vm',
            //controllerAs: 'vm',
            templateUrl: 'src/_proof.of.concepts/bookShelf/component.list/list.html',
          },
        }
      });
  /* tslint:enable */
}

export {BookShelfRoutesConfig}
