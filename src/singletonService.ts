export class SingletonService {
  private static instance: SingletonService;
  private readonly envConfig: { [key: string]: string };

  private constructor() {
    this.envConfig = {
      redisHost: process.env.REDIS_HOST || 'redis-cluster.h1-redis-dev',
      redisPort: process.env.REDIS_PORT || '6379',
      redisPassword: process.env.REDIS_PASSWORD || 'h1devredis1688',
      dbHost: process.env.DB_HOST || 'daydb-svc.h1-db-dev',
      dbPort: process.env.DB_PORT || '1433',
      dbName: process.env.DB_NAME || 'HKNetGame_HJ',
      dbUser: process.env.DB_USER || 'mobile_api',
      dbPassword: process.env.DB_PASSWORD || 'a:oY%~^E+VU0',
    };
  }

  static getInstance(): SingletonService {
    if (!SingletonService.instance) {
      SingletonService.instance = new SingletonService();
    }
    return SingletonService.instance;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
