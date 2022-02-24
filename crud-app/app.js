const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const { notFound, errorHandler } = require('./middlewares');

const app = express();

require('dotenv').config();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

const admin = require('./api/admin');
const users = require('./api/userdetail');
app.use('/api/admin', admin);
app.use('/api/users', users);

app.use(notFound);
app.use(errorHandler);

module.exports = app;