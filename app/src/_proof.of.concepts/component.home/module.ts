'use strict';

import * as angular from 'angular';
import 'angular-ui-router';
import {HomeRoutesConfig} from './routes';

let homeModule: ng.IModule = angular.module('app.poc.component.home', ['ui.router']);

homeModule.config(HomeRoutesConfig);

export {homeModule}
