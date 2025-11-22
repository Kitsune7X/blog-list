import express from 'express';
import logger from '../utils/logger.js';
// Use the express.Router class to create modular,
// mountable route handlers. A Router instance is a
// complete middleware and routing system;
// for this reason, it is often referred to as a “mini-app”.
// https://expressjs.com/en/guide/routing.html
const router = express.Router();

// ---------- Timelog middleware that is specific to this router ----------
const timeLog = (req, res, next) => {
  logger.info('Time: ', Date.now());
  next();
};

router.use(timeLog);

// ---------- Welcome page ----------
router.get('/', (req, res) => res.send('<h1>WELCOME!</h1>'));

export default router;
