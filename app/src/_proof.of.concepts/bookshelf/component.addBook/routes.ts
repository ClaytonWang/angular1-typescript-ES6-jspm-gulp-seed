/// <reference path='../../../../../typings/tsd.d.ts' />
'use strict';

BookShelfAddbookRoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function BookShelfAddbookRoutesConfig(
  $stateProvider: ng.ui.IStateProvider) {
  'use strict';

  $stateProvider
    .state(
      'app.bookShelf.addBook',
      {
        url: '/addBook',
        views: {
          'bookShelf@app.bookShelf': {
            controller: 'app.poc.bookShelf.addBookController as vm',
            // controllerAs: 'vm',
            templateUrl: 'src/_proof.of.concepts/bookShelf/component.addBook/addBook.html'
          },
        }
      });
}

export {BookShelfAddbookRoutesConfig}
