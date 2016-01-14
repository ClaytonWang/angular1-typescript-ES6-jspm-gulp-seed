'use strict';

import {BookShelfAppRoutesConfig} from './routes';

import '../component.addBook/module';
import '../component.archiveBook/module';
import '../component.list/module';
import '../factory.bookshelf/module';

let bookShelfAppModule = angular.module('bookShelf', [
    'app.poc.bookShelf.addBook',
    'app.poc.bookShelf.archiveBook',
    'app.poc.bookShelf.list'
  ])
  .config(BookShelfAppRoutesConfig);

export {bookShelfAppModule};
