const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>こんにちは！</h1>');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
