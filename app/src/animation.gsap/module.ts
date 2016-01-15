/// <reference path='../../../typings/tsd.d.ts' />
'use strict';

import * as angular from 'angular';
import {ngViewGsap} from './gsap.animation';

let appAnimationGsap: ng.IModule = angular.module('app.animation.gsap', []);

ngViewGsap.$inject = ['uixPosition'];
appAnimationGsap.animation('.gsap-animate-view', ngViewGsap);

export {appAnimationGsap};
