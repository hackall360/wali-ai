import type { ShardingManager } from "discord.js";

import { logger } from "#utils/logger";

export interface ServiceConfig {
  name: string;
  enabled: boolean;
  interval?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

export abstract class Service {
  protected manager: ShardingManager | null = null;
  protected intervalId: NodeJS.Timeout | null = null;
  protected isRunning = false;
  protected config: ServiceConfig;

  constructor(config: ServiceConfig) {
    this.config = {
      retryAttempts: 3,
      retryDelay: 5000,
      ...config,
    };
  }

  public initialize(manager: ShardingManager): void {
    this.manager = manager;
    logger.info(`Service ${this.config.name} initialized`);
  }

  public async start(): Promise<void> {
    if (!this.manager) {
      throw new Error(`Service ${this.config.name} not initialized with shard manager`);
    }

    if (!this.config.enabled) {
      logger.info(`Service ${this.config.name} is disabled`);
      return;
    }

    if (this.isRunning) {
      logger.warn(`Service ${this.config.name} is already running`);
      return;
    }

    try {
      await this.onStart();
      this.isRunning = true;

      if (this.config.interval) {
        this.intervalId = setInterval(() => {
          this.executeWithRetry();
        }, this.config.interval);
      }

      logger.info(`Service ${this.config.name} started successfully`);
    } catch (error) {
      logger.error(`Failed to start service ${this.config.name}: ${error}`);
      throw error;
    }
  }

  public async stop(): Promise<void> {
    if (!this.isRunning) {
      return;
    }

    try {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }

      await this.onStop();
      this.isRunning = false;

      logger.info(`Service ${this.config.name} stopped successfully`);
    } catch (error) {
      logger.error(`Failed to stop service ${this.config.name}: ${error}`);
    }
  }

  public async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }

  public getStatus(): {
    name: string;
    running: boolean;
    enabled: boolean;
    hasInterval: boolean;
  } {
    return {
      name: this.config.name,
      running: this.isRunning,
      enabled: this.config.enabled,
      hasInterval: !!this.config.interval,
    };
  }

  private async executeWithRetry(): Promise<void> {
    let attempts = 0;

    while (attempts < (this.config.retryAttempts || 3)) {
      try {
        await this.execute();
        return;
      } catch (error) {
        attempts++;
        logger.error(`Service ${this.config.name} execution failed (attempt ${attempts}): ${error}`);

        if (attempts < (this.config.retryAttempts || 3)) {
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay || 5000));
        }
      }
    }

    logger.error(`Service ${this.config.name} failed after ${attempts} attempts`);
  }

  protected abstract onStart(): Promise<void>;
  protected abstract onStop(): Promise<void>;
  protected abstract execute(): Promise<void>;
}

export class ServiceManager {
  private services: Map<string, Service> = new Map();
  private manager: ShardingManager | null = null;

  public initialize(manager: ShardingManager): void {
    this.manager = manager;
    logger.info('Service manager initialized');
  }

  public registerService(service: Service): void {
    const status = service.getStatus();

    if (this.services.has(status.name)) {
      throw new Error(`Service ${status.name} is already registered`);
    }

    this.services.set(status.name, service);

    if (this.manager) {
      service.initialize(this.manager);
    }

    logger.info(`Service ${status.name} registered`);
  }


  public async startServices(serviceName?: string): Promise<void> {
    if (!this.manager) {
      throw new Error('Service manager not initialized with shard manager');
    }

    if (serviceName) {
      const service = this.services.get(serviceName);
      if (!service) {
        throw new Error(`Service ${serviceName} not found`);
      }
      await service.start();
      return;
    }

    const startPromises = Array.from(this.services.values()).map(async (service) => {
      try {
        await service.start();
      } catch (error) {
        logger.error(`Failed to start service ${service.getStatus().name}: ${error}`);
      }
    });

    await Promise.allSettled(startPromises);

    logger.info('All services started');
  }

  public async stopServices(serviceName?: string): Promise<void> {
    if (serviceName) {
      const service = this.services.get(serviceName);
      if (!service) {
        throw new Error(`Service ${serviceName} not found`);
      }
      await service.stop();
      return;
    }

    const stopPromises = Array.from(this.services.values()).map(async (service) => {
      try {
        await service.stop();
      } catch (error) {
        logger.error(`Failed to stop service ${service.getStatus().name}: ${error}`);
      }
    });

    await Promise.allSettled(stopPromises);

    logger.info('All services stopped');
  }

  public async restartServices(serviceName?: string): Promise<void> {
    if (serviceName) {
      const service = this.services.get(serviceName);
      if (!service) {
        throw new Error(`Service ${serviceName} not found`);
      }
      await service.restart();
      return;
    }

    await this.stopServices();
    await this.startServices();
  }

  public getServicesStatus(serviceName?: string): any {
    if (serviceName) {
      const service = this.services.get(serviceName);
      if (!service) {
        throw new Error(`Service ${serviceName} not found`);
      }
      return service.getStatus();
    }

    return Array.from(this.services.values()).map(service => service.getStatus());
  }

  public getService<T extends Service>(serviceName: string): T | undefined {
    return this.services.get(serviceName) as T;
  }

  public hasService(serviceName: string): boolean {
    return this.services.has(serviceName);
  }

  public getServiceNames(): string[] {
    return Array.from(this.services.keys());
  }
}

export const serviceManager = new ServiceManager();

