import express from 'express';
import Blog from '../models/blog.js';
import logger from '../utils/logger.js';
import { userExtractor } from '../utils/middleware.js';
// Use the express.Router class to create modular,
// mountable route handlers. A Router instance is a
// complete middleware and routing system;
// for this reason, it is often referred to as a “mini-app”.
// https://expressjs.com/en/guide/routing.html
const blogRouter = express.Router();

// ---------- Time log middleware that is specific to this router ----------
const timeLog = (req, res, next) => {
  logger.info('Time: ', new Date().toString());
  next();
};

blogRouter.use(timeLog);

// ---------- Get all blogs ----------
blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  res.json(blogs);
});

// ---------- Add new blog ----------
blogRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body;

  const user = req.user;

  if (!user) return res.status(401).json({ error: 'User not found' });

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = [...user.blogs, savedBlog._id];
  await user.save();

  res.status(201).json(savedBlog);
});

// ---------- View single blog ----------
blogRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findById(id);
  // logger.info(blog);
  if (!blog) {
    res.status(404).json({ error: 'Non exist blog' });
  } else res.status(200).json(blog);
});

// ---------- Delete a single blog ----------
blogRouter.delete('/:id', userExtractor, async (req, res) => {
  const id = req.params.id;

  const user = req.user;
  if (!user) return res.status(401).json({ error: 'User not found' });
  // console.log({ userID: user._id.toString(), userBlogs: user.blogs });

  const blogToDelete = await Blog.findById(id);
  // console.log({ blogUserId: blogToDelete.user.toString() });
  if (!blogToDelete) return res.status(400).end();

  if (blogToDelete.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(id);
    user.blogs = user.blogs.filter(
      (blog) => blog.toString() !== blogToDelete._id.toString(),
    );

    await user.save();
    return res.status(204).end();
  }

  return res.status(400).end();
});

// ---------- Update a single blog ----------
blogRouter.put('/:id', async (req, res) => {
  const id = req.params.id;

  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlog) return res.status(400).end();

  res.status(200).json(updatedBlog);
});

export default blogRouter;
