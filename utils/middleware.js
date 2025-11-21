import logger from './logger.js';

const reqLogger = (req, res, next) => {
  logger.info('----------------');
  logger.info('Method ', req.method);
  logger.info('Path ', req.path);
  logger.info('Body ', req.body);
  logger.info('----------------');
  next();
};

export default { reqLogger };
