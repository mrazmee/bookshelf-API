const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if(name === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })

        response.code(400);
        return response;
    }

    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })

        response.code(400);
        return response;
    }

    const newBook = {
        name, year, author, summary, publisher, 
        pageCount, readPage, reading, id,
        finished, insertedAt, updatedAt
    }

    books.push(newBook);

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id
        }
    });

    response.code(201);
    return response

}

const getAllBookHandler = (request, h) => {
    const { name, reading, finished } = request.query;
    let filtering = books;

    if(name !== undefined) {
        filtering = filtering.filter(
          (book) => book.name.toLowerCase().includes(name.toLowerCase()),
        );
      }

    if(reading !== undefined){
        filtering = filtering.filter(
            (book) => book.reading === !!Number(reading)
        )
    }
    
    if(finished !== undefined){
        filtering = filtering.filter(
            (book) => book.finished === !!Number(finished)
        )
    }

    const response = h.response({
        status: 'success',
        data:{
            books:filtering.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }))
        }
    })

    response.code(200);
    return response;
}

const getDetailBookHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.filter((b) => b.id === bookId)[0];

    if(book !== undefined){
        const response = h.response({
            status: 'success',
            data: {
                book
            }
        })

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    })

    response.code(404);
    return response;
}

const editBooksHandler = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const index = books.findIndex((n) => n.id === bookId);

    if(index === -1){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        })

        response.code(404);
        return response;
    }

    if(name === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        })

        response.code(400);
        return response;
    }

    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })

        response.code(400);
        return response;
    }

    books[index] = {
        ...books[index],
        name, year, author, summary, 
        publisher, pageCount, readPage, reading
    }

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
    })

    response.code(200);
    return response;
}

const deleteBooksHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((n) => n.id === bookId);

    if(index === -1){
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        })

        response.code(404);
        return response;
    }

    books.splice(index, 1);
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
    })

    response.code(200);
    return response;
}


module.exports = { addBookHandler, getAllBookHandler, getDetailBookHandler, editBooksHandler, deleteBooksHandler };