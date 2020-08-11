const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config()

const middleware = require('./middlewares')

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN
  })
);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// 404 Erorr handler
app.use(middleware.notFound)
app.use(middleware.errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
  console.log(`Server running in port: ${PORT}`);
});

