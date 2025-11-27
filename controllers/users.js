import bcrypt from 'bcrypt';
import express from 'express';
import logger from '../utils/logger.js';
import User from '../models/user.js';

const userRouter = express.Router();
