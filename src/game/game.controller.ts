import {
  Req,
  Res,
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { GameService } from './game.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Public } from '../public.decorator';
import { LoggingInterceptor } from '../middleware/logging.interceptor';
import { ApiOperation } from '@nestjs/swagger';
import { AllGameTokenModel } from '../model/game.model';
import { ServerIdModel } from '../model/game.model';

@Controller('/api/game')
@UseInterceptors(LoggingInterceptor)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  /**
   * 取得進桌的進線 url (測試用)
   */
  @UseGuards(AuthGuard('bearer'))
  @Post('/GetGameToken/W1RCGv3')
  @ApiOperation({ summary: '取得進桌的進線 url (測試用)' })
  w1RCGv3(@Req() req: Request, @Res() res: Response): any {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      //console.log(token);
      const result: string = this.gameService.getW1RCGv3(token);
      return res.status(200).format({
        'application/json': function () {
          res.send(result);
        },
      });
    }
  }
  /**
   * 用 thirdParty_id 取得 Server_id
   */
  @Post('/ServerId')
  @ApiOperation({ summary: '用 thirdParty_id 取得 Server_id' })
  @Public()
  async ServerId(
    @Res() res: Response,
    @Body() body: ServerIdModel,
  ): Promise<any> {
    const result: string = await this.gameService.getServerId(body);
    return res.status(200).format({
      'application/json': function () {
        res.send(result);
      },
    });
  }
  @Get('/healthcheck')
  @ApiOperation({ summary: '健康度檢查' })
  @Public()
  async HealthCheck(@Res() res: Response): Promise<any> {
    const result: string = await this.gameService.getHealthCheck();
    return res.status(200).format({
      'application/json': function () {
        res.send(result);
      },
    });
  }
  @Get('/ReportStatusCheck')
  @ApiOperation({ summary: '取得目前抓單的狀態' })
  @Public()
  async ReportStatusCheck(@Res() res: Response): Promise<any> {
    const result: string = await this.gameService.getReportStatusCheck();
    return res.status(200).format({
      'application/json': function () {
        res.send(result);
      },
    });
  }
  /**
   * 指定 thirdParty_id 測試所有遊戲的進線狀態
   */
  @Post('/GetGameToken')
  @ApiOperation({ summary: '指定 thirdParty_id 測試所有遊戲的進線狀態' })
  @Public()
  async GetGameToken(
    @Res() res: Response,
    @Body() body: AllGameTokenModel,
  ): Promise<any> {
    const result: string = await this.gameService.getAllGameToken(body);
    return res.status(200).format({
      'application/json': function () {
        res.send(result);
      },
    });
  }
}
