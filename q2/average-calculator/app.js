const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { getNumbers } = require('./controllers/numbersController');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/numbers/:numberid', getNumbers);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    windowPrevState: [],
    windowCurrState: [],
    numbers: [],
    avg: 0
  });
});

module.exports = app;