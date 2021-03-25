var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var indexRouter = require('./routes/index');
var weatherRouter = require('./routes/weather');
var favouritesRouter = require('./routes/favourites');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sessionStore = new MySQLStore({
  host: 'mysql',
  port: 3306,
  user: 'root',
  password: 'rootroot',
  database: 'web',
  createDatabaseTable: true,
  clearExpired: true,
  checkExpirationInterval: 900000,
  connectionLimit: 1,
  endConnectionOnClose: true,
  expiration: 86400000,
  schema: {
    tableName: 'user',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
});

app.use(session({
  secret: 'keyboard cat',
  store: sessionStore,
  cookie: { maxAge: 600000 }
}))

app.use('/', indexRouter);
app.use('/weather', weatherRouter);
app.use('/favourites', favouritesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
