import type { ContractModel, ItemModel, NpcModel, PlaceableModel, SkillModel } from '#types/database';

const formatList = (items: string[]): string => items.map((item) => `- ${item}`).join('\n');

export const formatItem = (item: ItemModel): string => {
  const lines: string[] = [`**${item.name ?? 'Unknown Item'}**`];
  const description = item.shortDescription || item.description;
  if (description) lines.push('', description);

  const details: string[] = [];
  if (item.tier !== undefined) details.push(`Tier: ${item.tier}`);
  if (item.filterCategoryIds?.length) details.push(`Categories: ${item.filterCategoryIds.join(', ')}`);
  if (details.length) lines.push('', formatList(details));

  return lines.join('\n');
};

export const formatBuilding = (building: PlaceableModel): string => {
  const lines: string[] = [`**${building.name ?? 'Unknown Building'}**`];
  if (building.description) lines.push('', building.description);

  const details: string[] = [];
  if (building.faction) details.push(`Faction: ${building.faction}`);
  if (building.buildableTier) details.push(`Tier: ${building.buildableTier}`);
  if (details.length) lines.push('', formatList(details));

  if (building.ingredients?.length) {
    lines.push(
      '',
      'Ingredients:',
      formatList(
        building.ingredients.map((ing) => {
          const name = ing.entity?.name || ing.entity?.id || 'Unknown';
          const qty = ing.quantity ?? '?';
          return `${qty} x ${name}`;
        })
      )
    );
  }

  return lines.join('\n');
};

export const formatSkill = (skill: SkillModel): string => {
  const lines: string[] = [`**${skill.name ?? 'Unknown Skill'}**`];
  if (skill.description) lines.push('', skill.description);

  const details: string[] = [];
  if (skill.skillTree) details.push(`Tree: ${skill.skillTree}`);
  if (skill.maxLevel !== undefined) details.push(`Max Level: ${skill.maxLevel}`);
  if (details.length) lines.push('', formatList(details));

  return lines.join('\n');
};

export const formatContract = (contract: ContractModel): string => {
  const lines: string[] = [`**${contract.name ?? 'Unknown Contract'}**`];
  if (contract.description) lines.push('', contract.description);

  if (contract.conditions?.length) {
    lines.push(
      '',
      'Conditions:',
      formatList(contract.conditions.map((c) => c.name || c.conditionType || 'Unknown condition'))
    );
  }

  return lines.join('\n');
};

export const formatNpc = (npc: NpcModel): string => {
  const lines: string[] = [`**${npc.name ?? 'Unknown NPC'}**`];
  if (npc.description) lines.push('', npc.description);

  const details: string[] = [];
  if (npc.hostilityType) details.push(`Hostility: ${npc.hostilityType}`);
  if (details.length) lines.push('', formatList(details));

  if (npc.sellsItems?.length) {
    lines.push('', 'Sells:', formatList(npc.sellsItems.map((i) => i.entity?.name || i.entity?.id || 'Unknown')));
  }

  if (npc.buysItems?.length) {
    lines.push('', 'Buys:', formatList(npc.buysItems.map((i) => i.entity?.name || i.entity?.id || 'Unknown')));
  }

  return lines.join('\n');
};

export default { formatItem, formatBuilding, formatSkill, formatContract, formatNpc };
