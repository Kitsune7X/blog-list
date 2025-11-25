import { test, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import blogHelper from './test_helper.js';
import Blog from '../models/blog.js';

// Wrap the Express app in `supertest` function
const api = supertest(app);

// ---------- Initialize Test Database ----------
beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(blogHelper.initialBlogs);
  console.log('Initialize Data complete');
});

// ---------- Test correct Content type ----------
test('Blogs are returned as json', async () => {
  console.log('-- 1st test begin --');
  console.log('----------------------------------');

  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

// ---------- Test all blogs are returned ----------
test('All blogs are returned', async () => {
  console.log('-- 2nd test begin --');
  console.log('----------------------------------');

  const blogs = await api.get('/api/blogs');
  // console.log(blogs.body);

  assert.strictEqual(blogs.body.length, blogHelper.initialBlogs.length);
});

// ---------- Test for specific blog ----------
test('A specific blog is within returned blogs', async () => {
  console.log('-- 3rd test begin --');
  console.log('----------------------------------');

  const blogs = await api.get('/api/blogs');

  // console.log(blogs.body);
  const blogTitles = blogs.body.map((z) => z.title);
  // console.log(blogTitles);

  assert.strictEqual(blogTitles[0], "Never Give Up: Cena's Mentality");
});

// ---------- Test to verify that unique identifier is named `id`  ----------
test('Unique identifier property of blog post is named id', async () => {
  console.log('-- 4rd test begin --');
  console.log('----------------------------------');

  // Get all the blog
  const blogs = await api.get('/api/blogs');
  // console.log(blogs.body);

  // Object.keys() return a array of keys. We check if each of those
  // array contain 'id'.
  const blogIdCheck = blogs.body.every((blog) =>
    Object.keys(blog).includes('id')
  );
  // console.log(blogIdCheck);

  assert.strictEqual(blogIdCheck, true);
});

// ---------- Close the connection ----------
// Note: Need to close the connection after test otherwise it would hang
after(async () => {
  await mongoose.connection.close();
});
