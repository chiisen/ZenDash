import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(@InjectRedis() private readonly redis: Redis) {}
  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    // 這裡實現你的任務邏輯
    const isRedisHealthy = await this.redis.ping();
    if (isRedisHealthy !== 'PONG') {
      this.logger.error('Redis is not healthy');
      throw new Error('Redis is not healthy');
    }
    this.logger.log('Redis is healthy');

    try {
      const value = await this.redis.get('K8SDEV_eventnews_1');
      if (this.isNotNullOrWhitespace(value)) {
        const obj = JSON.parse(value); // 將JSON字串轉換成物件
        this.logger.log(`EventNewsTitle: ${obj[0].EventNewsTitle}`);
      } else {
        this.logger.warn('Value is null or whitespace');
      }
    } catch (error) {
      this.logger.error('Error fetching from Redis', error.stack);
      throw error;
    }
  }

  /**
   *
   * @param input
   * @returns
   */
  isNotNullOrWhitespace(input: string | null | undefined): boolean {
    return input !== null && input !== undefined && input.trim() !== '';
  }
}
