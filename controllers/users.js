import bcrypt from 'bcrypt';
import express from 'express';
import logger from '../utils/logger.js';
import User from '../models/user.js';

const userRouter = express.Router();

// ---------- Add new user ----------
userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  // Define Salt round
  const saltRound = 10;
  // Hash the password
  const passwordHash = await bcrypt.hash(password, saltRound);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  logger.info(user);

  const savedUser = await user.save();

  logger.info(savedUser);

  res.status(201).json(savedUser);
});

export default userRouter;
