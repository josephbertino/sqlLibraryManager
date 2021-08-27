var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var { sequelize } = require('./models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Authentication to the sequelize database successful!");

    await sequelize.sync({force: true});
    console.log("Model synced to the database!")

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

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  const error = new Error();
  error.status = 404;
  error.message = "Sorry! We couldn't find the page you were looking for."
  res.status(404).render('page-not-found', { 
    error, 
    title: "Page Not Found"
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  err.status = err.status || 500;
  err.message = err.message || "500 Error. Apologies!"
  console.log(err.status + ": " + err.message);

  res.status(err.status).render('error', {
    error: err, 
    title: "Server Error"
  });
});

module.exports = app;
