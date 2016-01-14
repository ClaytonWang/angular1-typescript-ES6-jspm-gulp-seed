var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var bookShelfApi = require('./bookShelfApi');

router.route('/activeBooks')

  .get(function(request, response) {
    response.send(bookShelfApi.getBooks(false));
  });

router.route('/archivedBooks')
  .get(function(request, response) {
    response.send(bookShelfApi.getBooks(true));
  });

router.route('/books')
  .post(function(request, response) {
    var newBook = request.body;
    if (!newBook.title) {
      response.send(500, {errorText: 'No data found to add'});
    } else {
      bookShelfApi.addABook(newBook);
      response.send(200, {message: 'New book added to the list'});
    }
  });

router.route('/markRead/:id')
  .put(function(request, response) {
    if (!request.params.id) {
      response.send(500, {errorText: 'BookId not sent'});
    } else if (request.body.read === undefined || request.body.read === null) {
      response.send(500, {errorText: 'No data found to edit'});
    } else {
      var modifiedBook = bookShelfApi
        .modifyReadStatus(parseInt(request.params.id), request.body.read);
      if (modifiedBook === null) {
        response.send(500, {errorText: 'Book not found in the list'});
      } else {
        response.send(modifiedBook);
      }
    }
  });

router.route('/addToArchive/:id')
  .put(function(request, response) {
    if (!request.params.id) {
      response.send(500, {errorText: 'Can\'t update book if id is not sent'});
    } else {
      var modifiedBook = bookShelfApi.addToArchive(parseInt(request.params.id));
      if (modifiedBook === null) {
        response.send(500, {errorText: 'Book not found in the list'});
      } else {
        response.send(modifiedBook);
      }
    }
  });

router.route('/bookExists/:title')
  .get(function(request, response) {
    if (!request.params.title) {
      response.send(500, {errorText: 'Can\'t check existence of book if title is not sent'});
    } else {
      response.send(bookShelfApi.bookExists(request.params.title));
    }
  });

module.exports = router;
