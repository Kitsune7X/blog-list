import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    minLength: 3,
    required: [true, 'Title missing'],
  },
  author: {
    type: String,
    minLength: 3,
    required: [true, 'Author missing'],
  },
  url: {
    type: String,
    required: [true, 'Link missing'],
  },
  likes: Number,
});

export default mongoose.model('Blog', blogSchema);
