import { logger } from '../../src/utils/logger';

describe('logger utility', () => {
  it('logs messages without throwing', () => {
    expect(() => {
      logger.info('info');
      logger.error('error');
    }).not.toThrow();
  });
});

