const express = require('express');
const { createBook, getAllBook, getSingleBook, updateBook, deleteBook } = require('../controllers/bookController');

const router =  express.Router()

//post Api to createBook
router.post('/',createBook);

//Get Apis to fetch Book
router.get('/', getAllBook);
router.get('/single-book/:id', getSingleBook);

//Put Api to Update Book
router.put('/:id', updateBook);

//Delete Api to delete Book
router.delete('/:id' , deleteBook)

module.exports = router;
