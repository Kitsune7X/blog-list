import logger from './logger.js';

// ---------- Request logger ----------
const reqLogger = (req, res, next) => {
  logger.info('----------------');
  logger.info('Method ', req.method);
  logger.info('Path ', req.path);
  logger.info('Body ', req.body);
  logger.info('----------------');
  next();
};

// ---------- Error handling ----------
const errHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'ValidationError')
    return res.status(400).json({ error: err.message });
  else if (err.name === 'TypeError')
    return res.status(400).json({ error: 'Content missing' });
  next(err);
};

export default { reqLogger, errHandler };
