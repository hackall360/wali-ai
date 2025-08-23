import type { Tool } from '../polli';
import { formatBuilding, formatContract, formatItem, formatNpc, formatSkill } from './formatters';

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
  get_item: async ({ query }: { query: string }) => {
    const item = await searchAndGet<ItemModel>(query, 'items');
    return item ? formatItem(item) : `No item found for "${query}".`;
  },
  get_building: async ({ query }: { query: string }) => {
    const building = await searchAndGet<PlaceableModel>(query, 'buildables');
    return building ? formatBuilding(building) : `No building found for "${query}".`;
  },
  get_skill: async ({ query }: { query: string }) => {
    const skill = await searchAndGet<SkillModel>(query, 'skills');
    return skill ? formatSkill(skill) : `No skill found for "${query}".`;
  },
  get_contract: async ({ query }: { query: string }) => {
    const contract = await searchAndGet<ContractModel>(query, 'contracts');
    return contract ? formatContract(contract) : `No contract found for "${query}".`;
  },
  get_npc: async ({ query }: { query: string }) => {
    const npc = await searchAndGet<NpcModel>(query, 'npcs');
    return npc ? formatNpc(npc) : `No NPC found for "${query}".`;
  },
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
