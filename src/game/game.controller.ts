import { Res, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Public } from '../public.decorator';

@Controller('/api/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  /**
   * 取得進桌的進線 url (測試用)
   */
  @UseGuards(AuthGuard('bearer'))
  @Post('/GetGameToken/W1RCGv3')
  w1RCGv3(@Res() res: Response): any {
    const result: string = this.gameService.getW1RCGv3();
    return res.status(200).format({
      'application/json': function () {
        res.send(result);
      },
    });
  }
  /**
   * 用 thirdParty_id 取得 Server_id
   */
  @Post('/ServerId')
  @Public()
  async ServerId(@Res() res: Response, @Body() body: any): Promise<any> {
    const result: string = await this.gameService.getServerId(body);
    return res.status(200).format({
      'application/json': function () {
        res.send(result);
      },
    });
  }
}
