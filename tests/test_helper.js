import Blog from '../models/blog.js';

// Dummy data
const initialBlogs = [
  {
    title: "Never Give Up: Cena's Mentality",
    author: 'John Cena',
    url: 'https://wwe.com/articles/cena-mentality',
    likes: 15,
  },
  {
    title: 'Lucha Libre Heart',
    author: 'Rey Mysterio',
    url: 'https://wwe.com/articles/rey-heart',
    likes: 11,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});

  // Reformat the resolved value to custom `toJSON` set in `blogSchema`
  return blogs.map((blog) => blog.toJSON());
};

export default { initialBlogs, blogsInDb };
