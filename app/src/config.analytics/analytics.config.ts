/// <reference path='../../../typings/angularjs/angular.d.ts' />

AnalyticsConfig.$inject = ['$analyticsProvider'];

function AnalyticsConfig($analyticsProvider) {
    'use strict';
    $analyticsProvider.firstPageview(true);
    /* Records pages that don't use $state or $route */
    $analyticsProvider.withAutoBase(true);
    /* Records full path */
}

export {AnalyticsConfig}
