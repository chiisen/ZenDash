import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { Decimal } from 'decimal.js';

@Injectable()
export class TasksService implements OnModuleInit {
  private readonly logger = new Logger(TasksService.name);

  // 使用OnModuleInit確保在模塊初始化時調用init方法
  onModuleInit() {
    this.handleCron(); // 啟動時立即執行一次
  }

  /**
   * 用高精度套件計算總合
   * @param a
   * @param b
   * @returns
   */
  add(a: string, b: string): string {
    const result = new Decimal(a).plus(new Decimal(b));
    return result.toString();
  }

  constructor(@InjectRedis() private readonly redis: Redis) {}
  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    // 這裡實現你的任務邏輯
    const result = this.add('0.1', '0.2');
    if (result != '0.3') {
      this.logger.error(`${result}`);
    }

    const isRedisHealthy = await this.redis.ping();
    if (isRedisHealthy !== 'PONG') {
      this.logger.error('Redis is not healthy');
      throw new Error('Redis is not healthy');
    }
    this.logger.log('Redis is healthy');

    try {
      const value = await this.redis.get('ZenDash:ReBoot');
      if (this.isNotNullOrWhitespace(value)) {
      } else {
        this.logger.warn('⚠Redis 重開過❗❗❗');
      }
    } catch (error) {
      this.logger.error('🆘Error fetching from Redis', error.stack);
      throw error;
    }

    try {
      const value = await this.redis.get('K8SDEV_eventnews_1');
      if (this.isNotNullOrWhitespace(value)) {
        const obj = JSON.parse(value); // 將JSON字串轉換成物件
        this.logger.log(`👍EventNews: ${obj[0].EventNewsTitle}`);
      } else {
        this.logger.warn('⚠EventNews: Value is null or whitespace');
      }
    } catch (error) {
      this.logger.error('🆘Error fetching from Redis', error.stack);
      throw error;
    }

    try {
      const value = await this.redis.get('K8SDEV_MobilePopularGames');
      if (this.isNotNullOrWhitespace(value)) {
        const obj = JSON.parse(value); // 將JSON字串轉換成物件
        obj.forEach((element) => {
          if (
            element.localizationCode === null ||
            element.localizationCode === undefined ||
            element.localizationCode.trim() === ''
          ) {
            this.logger.log(
              `🆘MobilePopularGames: Null => ${element.gameId} - ${element.thirdPartyId} - ${element.gameType} - ${element.dbGameType}`,
            );
          }
        });
        this.logger.log(`👍MobilePopularGames: 【healthy】`);
      } else {
        this.logger.warn('⚠MobilePopularGames: Value is null or whitespace');
      }
    } catch (error) {
      this.logger.error('🆘Error fetching from Redis', error.stack);
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
