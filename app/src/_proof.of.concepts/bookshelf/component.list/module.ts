'use strict';

import {BookShelfRoutesConfig} from './routes';
import '../factory.bookshelf/module';

import {HomeController} from './bookShelf.ListController';

HomeController.controllerFactory.$inject = ['$timeout', 'bookShelfSvc'];

let bookShelfHomeModule = angular.module('app.poc.bookShelf.list', [
    'app.poc.bookShelf.factory'
  ])
  .config(BookShelfRoutesConfig)
  .controller('app.poc.bookShelf.listController', HomeController.controllerFactory);

export {bookShelfHomeModule};
