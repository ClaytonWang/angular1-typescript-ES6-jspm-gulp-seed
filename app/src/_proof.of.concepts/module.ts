import * as angular from 'angular';

import './component.about/module';
import './component.home/module';
import './bookShelf/component.bookshelf/module';

let appPOCModule: ng.IModule = angular.module('app.poc', [
  'app.poc.component.about',
  'app.poc.component.home',
  'bookShelf'
]);

export {appPOCModule};
