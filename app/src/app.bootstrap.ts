/// <reference path='../../typings/tsd.d.ts' />

// Load the Angular Material CSS associated with ngMaterial
// then load the main.css to provide overrides, etc.

// Contains Roboto font required by angular material
import 'assets/styles/fonts.css!';
import 'assets/styles/theme/bootstrap.css!';
import 'assets/styles/app.css!';
import 'assets/styles/features.css!';

// Load Angular libraries

import *
  as angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'app.templates';
import 'angular-ui-router';
import 'angular-cookies';
import 'angular-sanitize';
import 'angular-material';

// Third party modules

// Load App Angular Modules
import './component.app/module';
import './config.translation/translation.module';
import './provider.device/device.module';
import './config.analytics/analytics.module';

/**
 * Manually bootstrap the application when AngularJS and
 * the application classes have been loaded.
 */
angular.element(document).ready(function () {

  let body: Element = <HTMLElement>document.getElementsByTagName('body')[0];

  angular.module('app', [

    // Angular Modules
    'ngAnimate',
    'ngCookies',
    'ngAria',
    'ngMessages',
    'ui.router',
    'ngSanitize',
    'ngMaterial',

    // App Modules
    'app.templates',
    'app.translation',
    'app.analytics',
    'app.component'
  ]);

  angular.bootstrap(body, ['app'], {strictDi: false});

});
