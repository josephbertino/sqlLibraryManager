var express = require('express');
var router = express.Router();
var { Book } = require("../models");

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      next(error);
    }
  }
}

/* GET home page. */
// Home route should redirect to the /books route
router.get('/', asyncHandler(async (req, res) => {
  // res.render('index', { title: 'Express' });
  res.redirect('/books');
}));

// Show the full list of books
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render('index', {
    books,
    title: "Books",
  })
}));

module.exports = router;
