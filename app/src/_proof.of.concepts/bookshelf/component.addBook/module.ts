'use strict';

import * as angular from 'angular';
import 'angular-ui-router';
import {BookShelfAddbookRoutesConfig} from './routes';
import {AddBookController} from './addBook.controller';
import {UniqueBookTitle} from './addBook.directive';
import '../factory.bookshelf/module';

let addBookModule: ng.IModule = angular.module('app.poc.bookShelf.addBook', [
  'ui.router',
  'app.poc.bookShelf.factory']);

UniqueBookTitle.factory.$inject = ['$q', 'bookShelfSvc'];
AddBookController.factory.$inject = ['$timeout', 'bookShelfSvc'];

addBookModule
  .config(BookShelfAddbookRoutesConfig)
  .controller('app.poc.bookShelf.addBookController', AddBookController.factory)
  .directive('uniqueBookTitle', UniqueBookTitle.factory);

export {addBookModule};
