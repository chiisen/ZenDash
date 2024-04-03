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

@Module({
  imports: [ConfigModule.forRoot(), PassportModule],
  controllers: [AppController, MemberController, GameController],
  providers: [AppService, MemberService, HttpStrategy, GameService],
})
export class AppModule {}
