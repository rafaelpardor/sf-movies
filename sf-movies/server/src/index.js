const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const middleware = require('./middlewares');

const app = express();
const db = mongoose.connection;
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

db.on('error', console.error.bind(console, 'Connection Error'));
db.on('open', () =>{
	console.log("Connected to the database.")
})

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
