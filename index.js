import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import Blog from './models/blog.js';

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>こんにちは！</h1>');
});

const mongoUrl = process.env.MONGODB_URI;

mongoose
  .connect(mongoUrl, { family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB', err.message));

app.use(express.json());

const reqLogger = (req, res, next) => {
  console.log('Method ', req.method);
  console.log('Path ', req.path);
  console.log('Body ', req.body);
  console.log('----------------');
  next();
};

app.use(reqLogger);

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
