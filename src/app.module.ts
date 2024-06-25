import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // 更新導入
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberController } from './member/member.controller';
import { MemberService } from './member/member.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { HttpStrategy } from './middleware/http.strategy';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';
import { ExampleController } from './example/example.controller';
import { RedisModule } from '@nestjs-modules/ioredis';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    HttpModule.register({
      timeout: 90000, // 超時時間設置為 90 秒
    }),
    ConfigModule.forRoot(),
    PassportModule,
    RedisModule.forRoot({
      type: 'cluster',
      nodes: [
        {
          host: 'redis-cluster.h1-redis-dev',
          port: 6379,
        },
      ],
      options: {
        redisOptions: {
          password: 'h1devredis1688',
        },
      },
    }),
  ],
  controllers: [
    AppController,
    MemberController,
    GameController,
    ExampleController,
  ],
  providers: [
    AppService,
    MemberService,
    HttpStrategy,
    GameService,
    EventsGateway,
  ],
})
export class AppModule {}
