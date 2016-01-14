'use strict';

import * as angular from 'angular';

import {BookShelfFactoryService} from './bookShelf.factory';

let bookShelfFactoryModule: ng.IModule =
  angular.module('app.poc.bookShelf.factory', []);

BookShelfFactoryService.bookShelfFactory.$inject = ['$http'];

bookShelfFactoryModule.factory('bookShelfSvc', BookShelfFactoryService.bookShelfFactory);

export {bookShelfFactoryModule};
