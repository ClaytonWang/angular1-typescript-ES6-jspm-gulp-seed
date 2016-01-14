/// <reference path='../../../../../typings/tsd.d.ts' />
'use strict';

BookShelfAppRoutesConfig.$inject = ['$stateProvider'];

function BookShelfAppRoutesConfig(
  $stateProvider: any) {
  'use strict';

  /* tslint:disable */
  $stateProvider
    .state(
      'app.bookShelf',
      {
        url: '/bookShelf',
        views: {
          'content@app': {
            templateUrl: 'src/_proof.of.concepts/bookShelf/component.bookshelf/bookShelf.html',
          },
        },
        redirectTo: 'app.bookShelf.list'
      });
  /* tslint:enable */
}

export {BookShelfAppRoutesConfig}
