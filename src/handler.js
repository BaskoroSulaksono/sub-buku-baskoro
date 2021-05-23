// nanoid
const {nanoid} = require('nanoid');

const books = require('./books');

// handler 1 adding book
const addBookHandler = (request, h) =>{
  // get from body request
  const {name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading} = request.payload;

  // book id
  const id = nanoid(16);

  // created and update date
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // is book finished?
  const finished = pageCount === readPage ? true : false;

  // insert new book
  const newBook = {id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  // if name is blank
  if (name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  // if readPage greater than pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // push book if all data complete
  books.push(newBook);
  const isSuccess = books.filter((book)=> book.id === id).length > 0;
  // if success added
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } else {
  // generic error
    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  }
};

// handler 2 get all books
const getAllBooksHandler = () =>({
  status: 'success',
  data: {
    books: books.map((book) =>({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    })),
  },
});
// handler OPTIONAL , query parameter


// handler 3 get specific book
const getBookByIdHandler = (request, h) =>{
  // get id
  const {bookId}= request.params;
  const book = books.filter((b) => b.id === bookId)[0];
  // if found
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book: book,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// handler 4 updating a book
const editBookByIdHandler = (request, h) => {
  // get id
  const {bookId} = request.params;
  // get from new body request
  const {name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading} = request.payload;

  const updatedAt = new Date().toISOString();

  // find index target book
  const index = books.findIndex((book) => book.id === bookId);
  // found
  if (index !== -1) {
    // if new name is empty
    if (name == null) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }
    // if new readPage greater than new pageCount
    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }
    // if all clear and id found
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  } else {
    // if id not found
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

// handler 5 delete a book
const deleteBookByIdHandler = (request, h) =>{
  const {bookId} = request.params;

  // target from bookId will be deleted
  const index = books.findIndex((book) => book.id === bookId);
  // found
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  // not found
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
module.exports = {addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler};
