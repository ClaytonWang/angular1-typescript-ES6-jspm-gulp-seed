'use strict';

import * as angular from 'angular';
import 'angular-ui-router';
import {AboutRoutesConfig} from './routes';
import {AboutDirective} from './about.directive';

let aboutModule: ng.IModule = angular.module('app.poc.component.about', ['ui.router']);

aboutModule
  .config(AboutRoutesConfig)
  .directive('aboutComponent', AboutDirective.factory);
export {aboutModule};
