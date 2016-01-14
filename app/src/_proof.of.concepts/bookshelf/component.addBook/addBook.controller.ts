'use strict';

class AddBookController {

  public addBookForm: any;
  public book: any;
  public addSuccess: boolean;
  public addFailed: boolean;

  public $timeout: any;
  public bookShelfSvc: any;

  constructor($timeout, bookShelfSvc) {
    this.$timeout = $timeout;
    this.bookShelfSvc = bookShelfSvc;
  }

  addBook() {
    let _self = this;
    if (this.addBookForm.$valid && this.book !== {}) {
      this.bookShelfSvc.addBook(this.book).then(
        message => {
          _self.addSuccess = true;
          _self.$timeout(() => {
            _self.addSuccess = false;
          }, 2500);
          _self.resetBook();
        },

        error => {
          _self.addFailed = true;
          _self.$timeout(() => {
            _self.addFailed = false;
          }, 2500);
        });
    }
  }

  resetBook() {
    this.addBookForm.$setPristine();
    this.addBookForm.$setUntouched();
    this.book = {};
  }

  static factory($timeout, bookShelfSvc) {
    return new AddBookController($timeout, bookShelfSvc);
  }
}

export {AddBookController};
