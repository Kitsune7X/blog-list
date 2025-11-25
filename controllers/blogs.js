import express from 'express';
import logger from '../utils/logger.js';
// Use the express.Router class to create modular,
// mountable route handlers. A Router instance is a
// complete middleware and routing system;
// for this reason, it is often referred to as a “mini-app”.
// https://expressjs.com/en/guide/routing.html
const router = express.Router();
import Blog from '../models/blog.js';

// ---------- Time log middleware that is specific to this router ----------
const timeLog = (req, res, next) => {
  logger.info('Time: ', new Date().toString());
  next();
};

router.use(timeLog);

// ---------- Welcome page ----------
router.get('/', (req, res) => res.send('<h1>WELCOME!</h1>'));

// ---------- Get all blogs ----------
router.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({});

  res.json(blogs);
});

// ---------- Add new blog ----------
router.post('/api/blogs', (req, res, next) => {
  const body = req.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  blog
    .save()
    .then((savedBlog) => res.status(201).json(savedBlog))
    .catch((err) => next(err));
});

export default router;
