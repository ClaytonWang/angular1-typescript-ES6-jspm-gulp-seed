'use strict';

import * as angular from 'angular';
import {DeviceProvider} from './device.provider';

let appServices: ng.IModule = angular.module('app.services', [])
  .provider('device', DeviceProvider);

export {appServices};
