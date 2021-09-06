var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var asyncHandler = require('express-async-handler')
// Import the Book model
var { Book } = require("../models");

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  // Home route should redirect to the /books route
  res.redirect('/books');
}));

/* GET the full list of books */
router.get('/books', asyncHandler(async (req, res, next) => {
  // Find all books in the DB
  const allBooks = await Book.findAll();
  // Render "home" page listing all books entries
  res.render('index', {
    allBooks,
    title: "Books",
  })
}));

/* GET new book */
router.get('/books/new', asyncHandler(async (req, res, next) => {
  res.render('new-book', {book: {}, title: "New Book"});
}));

/* POST new book */
router.post('/books/new', asyncHandler(async (req, res, next) => {
  let book;
  try {
    // Try to create the Book entry given the form submission
    book = await Book.create(req.body);
    // If successful, return to home page 
    res.redirect("/");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // Some book attribute did not pass validation
      book = await Book.build(req.body);
      // Return to New Book page with book attributes and error messages
      res.render('new-book', { book, title: "New Book", errors: error.errors });
    } else {
      throw error;
    }
  }
}));

/* GET: Shows book detail form */
router.get('/books/:id', asyncHandler( async (req,res, next) => {
  // Find book by unique id number
  const book = await Book.findByPk(req.params.id);
  if (book) {
    // Book with given id exists, so show book details in form
    res.render('update-book', { book, title: "Update Book" });
  } else {
    // Book with given id does not exist
    throw createError(404, "Sorry! We couldn't find the page you were looking for.");
  }
}));

/* POST updated book details */
router.post('/books/:id', asyncHandler( async (req, res, next) => {
  let book;
  try {
    // Find the book by its unique identifier
    book = await Book.findByPk(req.params.id);
    if (book) {
      // Try to update the book with new values
      await book.update(req.body);
      res.redirect('/books');
    } else {
      // Book does not exist in DB
      throw createError(404, "Sorry! We couldn't find the page you were looking for.");
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      /* If values of book cannot be validated, create a temporary instance 
       * of the book with same id and values, and re-render the Book Details
       * page, passing validation errors along as well */ 
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render('update-book', { book, title: "Update Book", errors: error.errors})
    }
    else {
      throw error;
    }
  }
}))

/* POST delete book */
router.post('/books/:id/delete', asyncHandler(async(req, res, next) => {
  let book;
  try {
    // Find book by unique key
    book = await Book.findByPk(req.params.id);
    if (book) {
      // If book exists, delete its entry
      await book.destroy();
      res.redirect('/');
    } else {
      // Not technically a 404 error, since we found the book in the first place.
      // So throw a server error.
      throw createError(500, "There was a problem deleting the book with id " + book.id);
    }
  } catch (error) {
    throw error;
  }
}))

module.exports = router;
