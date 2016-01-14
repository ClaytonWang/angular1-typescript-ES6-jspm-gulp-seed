'use strict';

import * as angular from 'angular';

import {BookShelfArchiveRoutesConfig} from './routes';
import  {ArchiveController} from './archiveBook.controller';

ArchiveController.factory.$inject = ['bookShelfSvc'];

let bookShelfArchiveModule =  angular.module('app.poc.bookShelf.archiveBook', [
  ])
  .config(BookShelfArchiveRoutesConfig)
  .controller('app.poc.bookShelf.archiveController', ArchiveController.factory);

export {bookShelfArchiveModule};
