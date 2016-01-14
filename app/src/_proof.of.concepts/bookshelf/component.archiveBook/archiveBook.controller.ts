'use strict';

class ArchiveController {

    public books: any;
    public bookShelfSvc: any;

    constructor(bookShelfSvc) {
        this.bookShelfSvc = bookShelfSvc;
        this.init();
    }

    init() {
        let _self = this;
        this.bookShelfSvc.getArchivedBooks().then((books) => {
            _self.books = books;
        });
    }

    static factory(bookShelfSvc) {
        return new ArchiveController(bookShelfSvc);
    }
}

export {ArchiveController};
