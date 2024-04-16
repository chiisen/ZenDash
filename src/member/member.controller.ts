import { Res, Controller, Post, Get, Body } from '@nestjs/common';
import { MemberService } from './member.service';
import { Public } from '../public.decorator';
import { Response } from 'express';

@Controller('/api/member')
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
    return res.format({
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
    return res.format({
      'application/json': function () {
        res.send(result);
      },
    });
  }
}
