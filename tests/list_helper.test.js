import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import listHelper from '../utils/list_helper.js';

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

// ---------- Total Likes test ----------
describe('Total likes', () => {
  const blogs = [
    {
      _id: '64b11aa51b54a676234d1801',
      title: "Hustle, Loyalty, Respect: The Champion's Code",
      author: 'John Cena',
      url: 'https://wwe.com/articles/john-cena-code',
      likes: 28,
      __v: 0,
    },
    {
      _id: '64b11ab71b54a676234d1802',
      title: 'Art in Motion: The Charismatic Enigma',
      author: 'Jeff Hardy',
      url: 'https://wwe.com/articles/jeff-hardy-art-in-motion',
      likes: 22,
      __v: 0,
    },
    {
      _id: '64b11ac81b54a676234d1803',
      title: "Voices: The Apex Predator's Mind",
      author: 'Randy Orton',
      url: 'https://wwe.com/articles/randy-orton-apex-predator',
      likes: 17,
      __v: 0,
    },
    {
      _id: '64b11ad91b54a676234d1804',
      title: 'Flight of the Ultimate Underdog',
      author: 'Rey Mysterio',
      url: 'https://wwe.com/articles/rey-mysterio-underdog',
      likes: 19,
      __v: 0,
    },
    {
      _id: '64b11aea1b54a676234d1805',
      title: 'The Game: Mastering the Ring',
      author: 'Triple H',
      url: 'https://wwe.com/articles/triple-h-the-game',
      likes: 23,
      __v: 0,
    },
    {
      _id: '64b11afb1b54a676234d1806',
      title: 'Mind Games of The Deadman',
      author: 'The Undertaker',
      url: 'https://wwe.com/articles/undertaker-mind-games',
      likes: 26,
      __v: 0,
    },
  ];

  const oneBlog = [
    {
      _id: '64b11aa51b54a676234d1801',
      title: "Hustle, Loyalty, Respect: The Champion's Code",
      author: 'John Cena',
      url: 'https://wwe.com/articles/john-cena-code',
      likes: 28,
      __v: 0,
    },
  ];

  test('of empty list is zero', () =>
    assert.strictEqual(listHelper.totalLikes([]), 0));

  test('when list has only one blog, equal the likes of that', () =>
    assert.strictEqual(listHelper.totalLikes(oneBlog), 28));

  test('of a bigger list is calculated right', () =>
    assert.strictEqual(listHelper.totalLikes(blogs), 135));
});

// ---------- Favorite Blog test ----------
describe('Favorite Blog', () => {
  const blogs = [
    {
      _id: '64b11aa51b54a676234d1801',
      title: "Hustle, Loyalty, Respect: The Champion's Code",
      author: 'John Cena',
      url: 'https://wwe.com/articles/john-cena-code',
      likes: 28,
      __v: 0,
    },
    {
      _id: '64b11ab71b54a676234d1802',
      title: 'Art in Motion: The Charismatic Enigma',
      author: 'Jeff Hardy',
      url: 'https://wwe.com/articles/jeff-hardy-art-in-motion',
      likes: 22,
      __v: 0,
    },
    {
      _id: '64b11ac81b54a676234d1803',
      title: "Voices: The Apex Predator's Mind",
      author: 'Randy Orton',
      url: 'https://wwe.com/articles/randy-orton-apex-predator',
      likes: 17,
      __v: 0,
    },
    {
      _id: '64b11ad91b54a676234d1804',
      title: 'Flight of the Ultimate Underdog',
      author: 'Rey Mysterio',
      url: 'https://wwe.com/articles/rey-mysterio-underdog',
      likes: 19,
      __v: 0,
    },
    {
      _id: '64b11aea1b54a676234d1805',
      title: 'The Game: Mastering the Ring',
      author: 'Triple H',
      url: 'https://wwe.com/articles/triple-h-the-game',
      likes: 23,
      __v: 0,
    },
    {
      _id: '64b11afb1b54a676234d1806',
      title: 'Mind Games of The Deadman',
      author: 'The Undertaker',
      url: 'https://wwe.com/articles/undertaker-mind-games',
      likes: 26,
      __v: 0,
    },
  ];

  const oneBlog = [
    {
      _id: '64b11aa51b54a676234d1801',
      title: "Hustle, Loyalty, Respect: The Champion's Code",
      author: 'John Cena',
      url: 'https://wwe.com/articles/john-cena-code',
      likes: 28,
      __v: 0,
    },
  ];

  test('when the list is empty, display the message', () =>
    assert.strictEqual(listHelper.favoriteBlog([]), 'There is no spoon'));

  test('when list has only one blog, return the same blog', () =>
    assert.deepStrictEqual(listHelper.favoriteBlog(oneBlog), {
      _id: '64b11aa51b54a676234d1801',
      title: "Hustle, Loyalty, Respect: The Champion's Code",
      author: 'John Cena',
      url: 'https://wwe.com/articles/john-cena-code',
      likes: 28,
      __v: 0,
    }));

  test('when there any many blogs, return the blog with the most likes', () =>
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), {
      _id: '64b11aa51b54a676234d1801',
      title: "Hustle, Loyalty, Respect: The Champion's Code",
      author: 'John Cena',
      url: 'https://wwe.com/articles/john-cena-code',
      likes: 28,
      __v: 0,
    }));
});
