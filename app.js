const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config/index')

//connect mongoose
const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex:true
})

// var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const settingRouter = require('./routes/setting')
const shopRouter = require('./routes/shop')

//import middleware
const errorHandle = require('./middlewares/errorHandler')
const passportJWT = require('./middlewares/passportJWT')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/api/users', usersRouter);

app.use('/api/setting',passportJWT.isLogin,settingRouter)

app.use('/api/shop',shopRouter);

app.use(errorHandle);

module.exports = app;
