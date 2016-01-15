/**
 * import './translation/index';
 *
 * angular('app', ['app.translation']);
 */

'use strict';

import * as angular from 'angular';
import 'angular-translate';
import 'angular-translate-loader-static-files';
import 'angular-translate-storage-cookie';
import 'angular-translate-storage-local';

import {TranslationConfig} from './translation.config';
import {languageToUse} from './language.run';
import {LanguageService} from './language.service';

LanguageService.serviceFactory.$inject = ['$locale'];

let languageService: ng.IModule = angular.module('app.translation.language.service', [])
                                      .factory('language', LanguageService.serviceFactory);

let translation: ng.IModule = angular.module(
    'app.translation', ['pascalprecht.translate', 'app.translation.language.service']);

translation.config(TranslationConfig).run(languageToUse);

export {translation, languageService};
