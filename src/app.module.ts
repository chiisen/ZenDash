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
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './schedule/tasksService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './test/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './game/game.schema';
// import { GameModule } from './game/game.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    TypeOrmModule.forRoot({
      type: 'sqlite', // 指定使用 SQLite 数据库
      database: 'data/database.db', // 数据库文件路径
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 指定实体路径
      synchronize: true, // 在开发过程中，自动同步数据库结构
    }),
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/cookie'),
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    // 引入 GameModule
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
    TasksService,
  ],
})
export class AppModule {}
