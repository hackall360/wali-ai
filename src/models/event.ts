import type { ClientEvents } from 'discord.js';

type EventOptions = {
  once?: boolean;
  disabled?: boolean;
};

export abstract class Event {
  public readonly name: string;
  public readonly event: keyof ClientEvents;
  public readonly options?: EventOptions;

  constructor(name: string, event: keyof ClientEvents, options: EventOptions = {}) {
    this.name = name;
    this.event = event;
    this.options = options;
  }

  abstract listener(...args: any[]): Promise<void> | void;
}
