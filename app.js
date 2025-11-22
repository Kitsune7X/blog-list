import express from 'express';
import blogRouter from './controllers/blogs.js';
import config from './utils/config.js';
import logger from './utils/logger.js';
import middleware from './utils/middleware.js';

const app = express();

logger.info('Connecting to', config.MONGODB_URI);
// App will handle connecting to DB as well as routing

app.use('/', blogRouter);

export default app;
