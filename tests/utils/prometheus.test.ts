import {
  commandCounter,
  commandFailureCounter,
  commandSuccessCounter,
  totalGuilds,
  totalUsers,
} from '../../src/utils/prometheus.js';

describe('prometheus metrics', () => {
  it('updates counters and gauges without throwing', () => {
    expect(() => {
      totalGuilds.set(5);
      totalUsers.set({ guildId: '1' }, 10);
      const labels = { commandType: 'slash', type: 'chat', commandName: 'test' };
      commandCounter.inc(labels);
      commandSuccessCounter.inc(labels);
      commandFailureCounter.inc(labels);
    }).not.toThrow();
  });
});

