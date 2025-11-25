import { test, after, beforeEach, describe } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import blogHelper from './test_helper.js';
import Blog from '../models/blog.js';

// Wrap the Express app in `supertest` function
const api = supertest(app);

describe('When there are initially some blogs saved', () => {
  // ---------- Initialize Test Database ----------
  beforeEach(async () => {
    await Blog.deleteMany({});

    await Blog.insertMany(blogHelper.initialBlogs);
    // console.log('Initialize Data complete');
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

    const blogTitles = blogs.body.map((z) => z.title);

    assert.strictEqual(blogTitles[0], "Never Give Up: Cena's Mentality");
  });

  // ---------- Test to verify that unique identifier is named `id`  ----------
  test('Unique identifier property of blog post is named id', async () => {
    console.log('-- 4rd test begin --');
    console.log('----------------------------------');

    // Get all the blog
    const blogs = await api.get('/api/blogs');

    // Object.keys() return a array of keys. We check if each of those
    // array contain 'id'.
    const blogIdCheck = blogs.body.every((blog) =>
      Object.keys(blog).includes('id')
    );

    assert.strictEqual(blogIdCheck, true);
  });

  describe('Viewing a specific blog', () => {
    // ---------- Test succeed case ----------
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await blogHelper.blogsInDb();

      const blogToView = blogsAtStart[0];

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.deepStrictEqual(resultBlog.body, blogToView);
    });

    // ---------- Test valid id but deleted ----------
    test('fail with status 404 when blog does not exist', async () => {
      const nonExistingId = await blogHelper.nonExistingId();

      await api.get(`/api/blogs/${nonExistingId}`).expect(404);
    });

    // ---------- Test for invalid id ----------
    test('fail with status 400 when id is invalid', async () => {
      const invalidId = '23434311';

      await api.get(`/api/blogs/${invalidId}`).expect(400);
    });
  });

  describe('Post a new blog', () => {
    // ---------- Test Posting function ----------
    test.only('Post a new blog works', async () => {
      console.log('-- 5th test begin --');
      console.log('----------------------------------');

      const newBlog = {
        title: 'Rise of the Apex Predator',
        author: 'Randy Orton',
        url: 'https://wwe.com/articles/orton-apex',
        likes: 9,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await blogHelper.blogsInDb();

      // Check if the length of the new array === initialBlogs + 1
      assert.strictEqual(blogsAtEnd.length, blogHelper.initialBlogs.length + 1);

      // Check if the posted Blog is the same as `newBlog`
      const titles = blogsAtEnd.map((blog) => blog.title);

      assert.strictEqual(titles.includes(newBlog.title), true);
    });

    // ---------- Test for invalid blog post ----------
    test.only('Blog with empty body will not be added', async () => {
      console.log('-- 6th test begin --');
      console.log('----------------------------------');

      const blogWithoutBody = {};

      await api.post('/api/blogs').send(blogWithoutBody).expect(400);

      // Verify that the amount of blogs does not change
      const blogsAtEnd = await Blog.find({});

      assert.strictEqual(blogsAtEnd.length, blogHelper.initialBlogs.length);
    });

    // ---------- Test for missing `likes` property ----------
    // If the `likes` property is missing from `req`, default to 0
    test.only('When "Likes" is missing, default to 0', async () => {
      console.log('-- 7th test begin --');
      console.log('----------------------------------');

      const blogWithoutLikes = {
        title: "The Game's Evolution",
        author: 'Triple H',
        url: 'https://wwe.com/articles/triple-h-evolution',
      };

      // Test if the blog is successfully posted first
      await api
        .post('/api/blogs')
        .send(blogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      // Check if the likes is 0
      const addedBlog = (await Blog.find({})).at(-1);
      assert.strictEqual(addedBlog.likes, 0);
    });

    // ---------- Test for missing `Title` ----------
    test.only('Blog without "Title" will not be added', async () => {
      console.log('-- 8th test begin --');
      console.log('----------------------------------');

      const blogWithoutTitle = {
        author: 'The Undertaker',
        url: 'https://wwe.com/articles/undertaker-aura',
        likes: 31,
      };

      await api.post('/api/blogs').send(blogWithoutTitle).expect(400);

      // Verify that the amount of blogs does not change
      const blogsAtEnd = await Blog.find({});

      assert.strictEqual(blogsAtEnd.length, blogHelper.initialBlogs.length);
    });

    // ---------- Test for missing Author ----------
    test.only('Blog without "Author" will not be added', async () => {
      console.log('-- 9th test begin --');
      console.log('----------------------------------');

      const blogWithoutAuthor = {
        title: "The Deadman's Aura",
        url: 'https://wwe.com/articles/undertaker-aura',
        likes: 31,
      };

      await api.post('/api/blogs').send(blogWithoutAuthor).expect(400);

      const blogsAtEnd = await Blog.find({});

      assert.strictEqual(blogsAtEnd.length, blogHelper.initialBlogs.length);
    });

    // ---------- Test for missing Url ----------
    test.only('Blog without "Url" will not be added', async () => {
      console.log('-- 10th test begin --');
      console.log('----------------------------------');

      const blogWithoutUrl = {
        title: "The Deadman's Aura",
        author: 'The Undertaker',
        likes: 31,
      };

      await api.post('/api/blogs').send(blogWithoutUrl).expect(400);

      const blogsAtEnd = await Blog.find({});

      assert.strictEqual(blogsAtEnd.length, blogHelper.initialBlogs.length);
    });
  });
});

// ---------- Close the connection ----------
// Note: Need to close the connection after test otherwise it would hang
after(async () => {
  await mongoose.connection.close();
});
