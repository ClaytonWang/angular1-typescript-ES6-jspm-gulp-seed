'use strict';

// TODO WeakMaps do not work in TypeScript ( yet ).
// const HTTP = new WeakMap();

class BookShelfFactoryService {

  public $http: any;

  constructor($http) {
    // HTTP.set(this, $http);
    this.$http = $http;
  }

  getActiveBooks() {
    return this.$http.get('/api/activeBooks').then((result) => {
      return result.data;
    });
  }

  getArchivedBooks() {
    return this.$http.get('/api/archivedBooks').then((result) => {
      return result.data;
    });
  }

  markBookRead(bookId, isBookRead) {
    return this.$http.put('/api/markRead/' + bookId, {
      bookId: bookId,
      read: isBookRead
    });
  }

  addToArchive(bookId) {
    return this.$http.put('/api/addToArchive/' + bookId, {});
  }

  checkIfBookExists(title) {
    return this.$http.get('/api/bookExists/' + title).then((result) => {
      return result.data;
    });
  }

  addBook(book) {
    return this.$http.post('/api/books', book);
  }

  static bookShelfFactory($http) {
    return new BookShelfFactoryService($http);
  }

}

export {BookShelfFactoryService};
