const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? 'There is no spoon'
    : blogs.toSorted((a, b) => a.likes - b.likes).at(-1);
};

export default { dummy, totalLikes, favoriteBlog };
