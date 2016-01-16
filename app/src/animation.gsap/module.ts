/// <reference path='../../../typings/tsd.d.ts' />
'use strict';

import * as angular from 'angular';
import {ngViewGsap} from './gsap.animation';
import {gsapFactory} from './gsap.factory';

let appAnimationGsap: ng.IModule = angular.module('app.animation.gsap', []);

appAnimationGsap.factory('gsap', gsapFactory);

ngViewGsap.$inject = ['uixPosition', 'gsap'];
appAnimationGsap.animation('.gsap-animate-view', ngViewGsap);

export {appAnimationGsap};
