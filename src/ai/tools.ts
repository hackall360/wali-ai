import type { Tool } from '../polli';

import type { ContractModel, ItemModel, NpcModel, PlaceableModel, SkillModel } from '#types/database';
import { api } from '#utils/api';
import type { SupportedLocales } from '#utils/common';

const DEFAULT_LOCALE: SupportedLocales = 'en';

const searchAndGet = async <T>(query: string, type: string): Promise<T | null> => {
  const results = await api.search(DEFAULT_LOCALE, query, [type]);
  const path = results[0]?.path;
  if (!path) return null;
  return api.get<T>(path, DEFAULT_LOCALE);
};

export const exec = {
  get_item: async ({ query }: { query: string }) => searchAndGet<ItemModel>(query, 'items'),
  get_building: async ({ query }: { query: string }) => searchAndGet<PlaceableModel>(query, 'buildables'),
  get_skill: async ({ query }: { query: string }) => searchAndGet<SkillModel>(query, 'skills'),
  get_contract: async ({ query }: { query: string }) => searchAndGet<ContractModel>(query, 'contracts'),
  get_npc: async ({ query }: { query: string }) => searchAndGet<NpcModel>(query, 'npcs'),
};

export const tools: Tool[] = [
  {
    type: 'function',
    function: {
      name: 'get_item',
      description: 'Fetch an item by name.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Item name to search for.' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_building',
      description: 'Fetch a building or craftable by name.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Building name to search for.' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_skill',
      description: 'Fetch a skill by name.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Skill name to search for.' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_contract',
      description: 'Fetch a contract by name.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Contract name to search for.' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_npc',
      description: 'Fetch an NPC by name.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'NPC name to search for.' },
        },
        required: ['query'],
      },
    },
  },
];

export { tools as default };
