var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var { Book } = require('./models');

var app = express();

// import the instance of sequelize that was instantiated in models/index.js 
var { sequelize } = require('./models');
// import the function that will fill the books db with some initial entries
var fillDB = require('./fillDB');

(async () => {
  try {
    //  asynchronously connect to the database
    await sequelize.authenticate();
    console.log("Authentication to the sequelize database successful!");

    // sync the model with the database
    await sequelize.sync({force: true});
    console.log("Model synced to the database!")

    // fill the books db with some initial entries
    await fillDB(Book);

  } catch (error) {
    throw error;
  }
})();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/* Catch 404 error and forward to error handler */
app.use( (req, res, next) => {
  next(createError(404, "Sorry! We couldn't find the page you were looking for."));
});

/* Error handler */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  err.status = err.status || 500;
  err.message = err.message || "500 Error... Apologies! We are working on the issue."
  res.status(err.status);

  if (err.status === 404) {
    // render the 404 error page
    res.render('404-page-not-found', { 
      error: err, 
      title: "Page Not Found"
    });
  } else {
    // render the catch-all error page
    res.render('server-error', {
      error: err, 
      title: "Server Error"
    }); 
  }
});

module.exports = app;
