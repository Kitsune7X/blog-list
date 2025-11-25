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
test('blogs are returned as json', async () => {
  console.log('-- 1st test begin --');
  console.log('----------------------------------');

  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

// ---------- Test all blogs are returned ----------
test('all blogs are returned', async () => {
  console.log('-- 2nd test begin --');
  console.log('----------------------------------');

  const blogs = await Blog.find({});
  // console.log(blogs);

  assert.strictEqual(blogs.length, 2);
});

// ---------- Test for specific blog ----------
test('a specific blog is within returned blogs', async () => {
  console.log('-- 3rd test begin --');
  console.log('----------------------------------');

  const blogs = await Blog.find({});

  console.log(blogs);
  const blogTitles = blogs.map((z) => z.title);
  console.log(blogTitles);

  assert.strictEqual(blogTitles[0], "Never Give Up: Cena's Mentality");
});

// ---------- Close the connection ----------
// Note: Need to close the connection after test otherwise it would hang
after(async () => {
  await mongoose.connection.close();
});
