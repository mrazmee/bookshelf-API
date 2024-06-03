const { addBookHandler, getAllBookHandler, getDetailBookHandler, editBooksHandler, deleteBooksHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getDetailBookHandler
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBooksHandler
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBooksHandler
    }
]

module.exports = routes