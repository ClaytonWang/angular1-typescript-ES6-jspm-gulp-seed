'use strict';

class HomeController {

  public books: any;
  public readSuccess: any;
  public readSuccessMessage: string;
  public archiveSuccess: boolean;

  public bookShelfSvc: any;
  public $timeout: any;

  constructor($timeout, bookShelfSvc) {
    this.$timeout = $timeout;
    this.bookShelfSvc = bookShelfSvc;
    this.init();
  }

  init() {
    let _self = this;
    this.bookShelfSvc.getActiveBooks().then((books) => {
      _self.books = books;
    });
  };

  markBookAsRead(bookId, isBookRead) {
    let _self = this;
    return this.bookShelfSvc.markBookRead(bookId, isBookRead)
      .then(() => {
        _self.init();
        _self.readSuccess = true;
        _self.readSuccessMessage = isBookRead ? 'Book marked as read.' : 'Book marked as unread.';
        _self.$timeout(() => { _self.readSuccess = false; }, 2500);
      });
  }

  addToArchive(bookId) {
    let _self = this;
    return this.bookShelfSvc.addToArchive(bookId)
      .then(() => {
        _self.init();
        _self.archiveSuccess = true;
        _self.$timeout(() => { _self.archiveSuccess = false; }, 2500);
      });
  }

  static controllerFactory($timeout, bookShelfSvc) {
    return new HomeController($timeout, bookShelfSvc);
  }
}


export {HomeController};
