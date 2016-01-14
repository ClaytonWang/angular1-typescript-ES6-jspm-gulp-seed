/**
 * import './translation/index';
 *
 * angular('app', ['app.translation']);
 */

'use strict';

import * as angular from 'angular';
import 'angulartics';
import 'angulartics-google-analytics';
import {GoogleAnaltyics} from './analytics.google';
import {AnalyticsConfig} from './analytics.config';

/**
 * Injects Google Analytics script into DOM and
 * Registers Property.
 */
GoogleAnaltyics.factory();

let analytics: ng.IModule =
    angular.module('app.analytics', ['angulartics', 'angulartics.google.analytics']);

analytics.config(AnalyticsConfig);

export {analytics};
