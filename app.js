require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DBCONNECTION, {
    dbName: process.env.DB_NAME,
     useNewUrlParser: true,
     useUnifiedTopology: true 
     }).then(() => {
     console.log("successfully connected");
     }).catch(console.error);
 
     app.use(function(err, req, res, next) {
         console.log("error:::", err)
         res.status(err.status || 500).send({
             success: false,
             message: err.message
         });
       });
 app.listen(5000)

module.exports = app;
