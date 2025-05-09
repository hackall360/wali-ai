import { Counter, Gauge } from 'prom-client';

export const PROMETHEUS_PREFIX = 'thufir_bot_';
export const PROMETHEUS_PORT = 45407;

export const totalGuilds = new Gauge({
	name: PROMETHEUS_PREFIX + 'guilds_total',
	help: 'Total number of guilds'
});

export const totalUsers = new Gauge({
	name: PROMETHEUS_PREFIX + 'users_total',
	help: 'Total number of users',
	labelNames: ['guildId']
});

export const commandCounter = new Counter({
	name: PROMETHEUS_PREFIX + 'gateway_events_interaction_create_command_total',
	help: 'Total interaction create command gateway events',
	labelNames: ['commandType', 'type', 'commandName']
});

export const commandSuccessCounter = new Counter({
	name: PROMETHEUS_PREFIX + 'gateway_events_interaction_create_command_success_total',
	help: 'Total succeeded interaction create command gateway events',
	labelNames: ['commandType', 'type', 'commandName']
});

export const commandFailureCounter = new Counter({
	name: PROMETHEUS_PREFIX + 'gateway_events_interaction_create_command_failure_total',
	help: 'Total failed interaction create command gateway events',
	labelNames: ['commandType', 'type', 'commandName']
});
