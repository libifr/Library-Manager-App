var express = require('express');
var router = express.Router();
const Author = require('../models/dynamodb/author');
const Schema = require('../models/schema');
// const Author = require('../models/author');

/* GET home page. */
router.get('/addAuthor', async function(req, res, next) {
  const author = Object.assign({}, Schema.Author)
  res.render('authors/addAuthor', {author: author});
});

router.get('/' ,async function(req,res,next){
  const {data} = await Author.getAuthors(req, res)
  res.render('authors/index', {authors: data})
});
router.get('/:id' ,async function(req,res,next){
  const author = await Author.findById(req.params.id);
  res.render('authors/author', {author})
});

router.post('/', Author.addAuthor ,async function(req, res, next){
  try{
    res.redirect('/authors')
  } catch {
    res.render('authors/addAuthor', {author: req.body});
    //return next('error');
  }
});
module.exports = router;
