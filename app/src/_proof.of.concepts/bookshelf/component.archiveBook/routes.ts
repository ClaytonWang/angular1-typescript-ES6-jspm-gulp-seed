/// <reference path='../../../../../typings/tsd.d.ts' />
'use strict';

BookShelfArchiveRoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function BookShelfArchiveRoutesConfig(
  $stateProvider: ng.ui.IStateProvider) {
  'use strict';

  /* tslint:disable */
  $stateProvider
    .state(
      'app.bookShelf.archive',
      {
        url: '/archive',
        views: {
          'bookShelf@app.bookShelf': {
            controller: 'app.poc.bookShelf.archiveController as vm',
            //controllerAs: 'vm',
            templateUrl: 'src/_proof.of.concepts/bookShelf/component.archiveBook/archive.html'
          },
        }
      });
  /* tslint:enable */
}

export {BookShelfArchiveRoutesConfig}
