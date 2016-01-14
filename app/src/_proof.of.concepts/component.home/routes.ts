'use strict';

HomeRoutesConfig.$inject = ['$stateProvider'];

function HomeRoutesConfig($stateProvider: ng.ui.IStateProvider) {
  'use strict';

  $stateProvider
    .state(
      'app.home',
      {
        url: '/home',
        views: {
          'content@app': {
            templateUrl: 'src/_proof.of.concepts/component.home/home.html'
          },
        },
      });
}

export {HomeRoutesConfig}
