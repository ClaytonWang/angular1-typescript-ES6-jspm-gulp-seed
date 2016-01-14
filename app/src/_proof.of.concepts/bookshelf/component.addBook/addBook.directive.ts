'use strict';
import {IES6Directive} from 'es6-directive';

class UniqueBookTitle implements IES6Directive {

  static instance: any;

  public require: any;
  public restrict: any;

  public $q: any;
  public bookShelfSvc: any;

  static factory($q, bookShelfSvc) {
    UniqueBookTitle.instance = new UniqueBookTitle($q, bookShelfSvc);
    return UniqueBookTitle.instance;
  }

  constructor($q, bookShelfSvc) {
    this.require = 'ngModel';
    this.restrict = 'A';

    this.$q = $q;
    this.bookShelfSvc = bookShelfSvc;
  }

  link(scope, elem, attrs, ngModelController) {
    ngModelController.$asyncValidators.uniqueBookTitle = function (value) {

      return UniqueBookTitle.instance.$q((resolve, reject) => {
        UniqueBookTitle.instance.bookShelfSvc.checkIfBookExists(value).then(result => {
          if (result) {
            reject();
          } else {
            resolve();
          }
        });
      });
    };
  }
}

export {UniqueBookTitle};
