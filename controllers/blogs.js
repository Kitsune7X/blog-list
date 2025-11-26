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
router.post('/api/blogs', async (req, res) => {
  const body = req.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

// ---------- View single blog ----------
router.get('/api/blogs/:id', async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findById(id);
  // logger.info(blog);
  if (!blog) {
    res.status(404).json({ error: 'Non exist blog' });
  } else res.status(200).json(blog);
});

// ---------- Delete a single blog ----------
router.delete('/api/blogs/:id', async (req, res) => {
  const id = req.params.id;

  const deletedBlog = await Blog.findByIdAndDelete(id);

  if (!deletedBlog) return res.status(400).end();
  res.status(204).end();
});

// ---------- Update a single blog ----------
router.put('/api/blogs/:id', async (req, res) => {
  const id = req.params.id;

  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlog) return res.status(400).end();

  res.status(200).json(updatedBlog);
});

export default router;
