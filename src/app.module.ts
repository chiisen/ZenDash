import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberController } from './member/member.controller';
import { MemberService } from './member/member.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { HttpStrategy } from './http.strategy';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';
import { ExampleController } from './example/example.controller';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
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
  providers: [AppService, MemberService, HttpStrategy, GameService],
})
export class AppModule {}
