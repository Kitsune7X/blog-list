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

const unknownEndpoint = (req, res) =>
  res.status(404).send('<h2>Unknown Endpoint!</h2>');

// ---------- Error handling ----------
const errHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'ValidationError')
    return res.status(400).json({ error: err.message });
  else if (err.name === 'TypeError')
    return res.status(400).json({ error: 'Content missing' });
  else if (err.name === 'CastError')
    return res.status(400).json({ error: err.message });
  else if (
    err.name === 'MongoServerError' &&
    err.message.includes('E11000 duplicate key error')
  )
    return res.status(400).json({ error: 'Username must be unique' });
  else if (err.name === 'JsonWebTokenError')
    return res.status(400).json({ error: 'Token invalid' });

  next(err);
};

export { reqLogger, unknownEndpoint, errHandler };
