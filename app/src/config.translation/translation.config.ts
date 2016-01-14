import {DeviceProvider} from '../provider.device/device.provider';

TranslationConfig.$inject = ['$translateProvider'];

function TranslationConfig($translateProvider) {
  'use strict';

  let deviceProvider = new DeviceProvider();

  /* tslint:disable */
   console.debug("isApp:  ", deviceProvider.isApp());
  /* tslint:enable */

  // Register a loader for the static files
  // So, the module will search missing translation tables under the specified urls.
  // Those urls are [prefix][langKey][suffix].
  $translateProvider.useStaticFilesLoader(
      {prefix: deviceProvider.getHost() + 'languages/', suffix: '.json'});

  // Tell the module what language to use by default
  $translateProvider.preferredLanguage('en-us');

  // Tell the module to store the language in the local storage
  $translateProvider.useLocalStorage();

  // sanitizes HTML in the translation text using $sanitize
  // http://angular-translate.github.io/docs/#/guide/19_security
  $translateProvider.useSanitizeValueStrategy('sanitize');
}

export {TranslationConfig}
