import 'dotenv/config.js';
import Blog from './models/blog.js';
import morgan from 'morgan';
import config from './utils/config.js';
import middleware from './utils/middleware.js';
import app from './app.js';

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

// Build the database first or make simple test?
// Structure the app
// Start with config first
