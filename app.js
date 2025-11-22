import express from 'express';
import blogRouter from './controllers/blogs.js';
import config from './utils/config.js';
import logger from './utils/logger.js';
import mongoose from 'mongoose';
import middleware from './utils/middleware.js';
import morgan from 'morgan';

// Call the Express factory function to create app instance
const app = express();

// ---------- Initial logging status ----------
logger.info('Connecting to', config.MONGODB_URI);

// ---------- Morgan ----------
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :response-time ms - :res[content-length] :body')
);

// ---------- Connect to MongoDB ----------
mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB', err.message));

// ---------- Parse Json ----------
app.use(express.json());

// ---------- Logging request ----------
app.use(middleware.reqLogger);

// ---------- Pass request to '/' to router 'mini-app' ----------
app.use('/', blogRouter);

// ---------- Handle error ----------
app.use(middleware.errHandler);

export default app;
