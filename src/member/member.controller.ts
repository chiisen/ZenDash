import {
  Res,
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { Public } from '../public.decorator';
import { Response } from 'express';
import { LoggingInterceptor } from '../logging.interceptor';

@Controller('/api/member')
@UseInterceptors(LoggingInterceptor)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async getHello(@Res() res: Response, @Body() body: any): Promise<any> {
    return await this.memberService.getLogin(body);
  }
  /**
   * 取得登入資訊
   */
  @Post('login')
  @Public()
  async login(@Res() res: Response, @Body() body: any): Promise<any> {
    const result: any = await this.memberService.getLogin(body);
    return res.status(200).format({
      'application/json': function () {
        res.send(result);
      },
    });
  }
  /**
   * 取得玩家資訊
   */
  @Post('userInfo')
  @Public()
  async userInfo(@Res() res: Response, @Body() body: any): Promise<any> {
    const result: any = await this.memberService.getUserInfo(body);
    return res.status(200).format({
      'application/json': function () {
        res.send(result);
      },
    });
  }
}
