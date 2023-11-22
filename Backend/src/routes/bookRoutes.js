const express = require('express');
const { createBook } = require('../controllers/bookController');
const router =  express.Router()

//post Api to createBook
router.post('/',createBook);


module.exports = router;
