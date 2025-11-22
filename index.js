import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import Blog from './models/blog.js';
import morgan from 'morgan';
import config from './utils/config.js';
import middleware from './utils/middleware.js';
import app from './app.js';

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB', err.message));

// app.use(express.json());

// app.use(middleware.reqLogger);

// ---------- Morgan ----------
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :response-time ms - :res[content-length] :body')
);

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

app.post('/api/blogs', (req, res) => {
  const body = req.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

// Build the database first or make simple test?
// Structure the app
// Start with config first
