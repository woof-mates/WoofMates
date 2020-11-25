const express = require('express');
const app = express();
const volleyball = require('volleyball');
const path = require('path');

app.use(express.json());
app.use(volleyball);
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

// app.use('/api', require('./api')); commented out since api folder is empty

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    //seed file
    console.log(`Listening on Port ${PORT}`);
});