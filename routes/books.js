var express = require('express');
var router = express.Router();
const Author = require('../models/dynamodb/author');
const Book = require('../models/dynamodb/book');
const Schema = require("../models/schema");

/* GET home page. */
router.get('/addBook',async function(req, res, next) {
  //res.render('index', { title: 'Express' });
  const {data: authors} = await Author.getAuthors(req, res);
  const book = Object.assign({}, Schema.Book)
  res.render('books/addBook', {book: book, authors: authors});
});

router.get('/' ,async function(req,res,next){
  const {data} = await Book.getBooks(req, res)
  res.render('books/index', {books: data})
});
router.post('/', Book.addBook);
module.exports = router;
