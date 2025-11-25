import { test, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import Blog from '../models/blog.js';

// Wrap the Express app in `supertest` function
const api = supertest(app);

// Dummy data
const blogs = [
  {
    _id: '64b31ab71b54a676234d2002',
    title: "Never Give Up: Cena's Mentality",
    author: 'John Cena',
    url: 'https://wwe.com/articles/cena-mentality',
    likes: 15,
    __v: 0,
  },
  {
    _id: '64b31ac81b54a676234d2003',
    title: 'Lucha Libre Heart',
    author: 'Rey Mysterio',
    url: 'https://wwe.com/articles/rey-heart',
    likes: 11,
    __v: 0,
  },
];

// ---------- Initialize Test Database ----------
beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(blogs[0]);
  // console.log(blogObject);
  await blogObject.save();
  console.log('Added 1st blog');

  blogObject = new Blog(blogs[1]);
  // console.log(blogObject);
  await blogObject.save();
  console.log('Added 2nd blog');
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
