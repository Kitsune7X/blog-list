import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

// Reformat returned Object value
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

export default User;
