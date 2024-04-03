import { Res, Controller, Post, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('/api/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(AuthGuard('bearer'))
  @Post('/GetGameToken/W1RCGv3')
  w1RCGv3(@Res() res: Response): any {
    const result: string = this.gameService.getW1RCGv3();
    return res.format({
      'application/json': function () {
        res.send(result);
      },
    });
  }
}
