import Blog from '../models/blog.js';

// Dummy data
const initialBlogs = [
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

const blogsInDb = async () => {
  const blogs = await Blog.find({});

  // Reformat the resolved value to custom `toJSON` set in `blogSchema`
  return blogs.map((blog) => blog.toJSON());
};

export default { initialBlogs, blogsInDb };
