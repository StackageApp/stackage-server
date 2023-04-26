require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(router);


app.listen(process.env.PORT);