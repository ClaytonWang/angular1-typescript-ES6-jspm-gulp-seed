'use strict';

AboutRoutesConfig.$inject = ['$stateProvider'];

function AboutRoutesConfig($stateProvider: ng.ui.IStateProvider) {
  'use strict';
  $stateProvider.state(
    'app.about',
    {
      url: '/about',
      views: {
        'content@app': {
          template: '<about-component></about-component>'
        }
      }
    }
  );
}

export {AboutRoutesConfig}
