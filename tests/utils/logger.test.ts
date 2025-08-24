import { logger } from '../../src/utils/logger.js';

describe('logger utility', () => {
  it('logs messages without throwing', () => {
    expect(() => {
      logger.info('info');
      logger.error('error');
    }).not.toThrow();
  });
});

