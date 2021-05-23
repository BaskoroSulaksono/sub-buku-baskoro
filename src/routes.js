const {addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler} = require('./handler');
const routes = [
  {
    // adding book
    method: 'POST',
    path: '/books',
    handler: addBookHandler,

  },
  {
    // get all book
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    // get book id
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },
  {
    // updating a book
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler,

  },
  {
    // delete a book
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler,
  }];
module.exports = routes;
