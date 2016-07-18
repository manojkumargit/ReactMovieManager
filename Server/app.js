var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var routes = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test.js');
var mongoose = require('mongoose');
var moviemanager = require('./routes/moviemanager.js');
var app = express();
mongoose.connect("mongodb://localhost/test");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('superSecret', "somesecret");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, '../UI/dist/')));
app.use('/', routes);
app.use('/users', users);
app.use('/testit',test);
app.use("/movies",moviemanager);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.get('/user/authenticate/:email/:password',function(req, res){
    console.log(req.params.email);
   if ('admin@gmail.com' != req.params.email)
   {
       res.json({ success: false, message: 'Authentication failed. User not found.' });
   }
   else if ('admin' != req.params.password)
   {
      res.json({ success: false, message: 'Authentication failed. Wrong password.' });
     }
     else
     {
       var token = jwt.sign('user', app.get('superSecret'),
       {
         //expiresInMinutes: 1440 // expires in 24 hours
       });
         res.json(
       {
         success: true,
         message: 'Enjoy your token!',
         token: token
       });
     }
 });


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;
