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
import { MemberLoginModel } from '../member-login.model';
import { ApiOperation } from '@nestjs/swagger';

/**
 * @swagger
 * tags:
 *   name: Member
 *   description: Member management
 */

@Controller('/api/member')
@UseInterceptors(LoggingInterceptor)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  /**
   * @swagger
   * /api/member:
   *   get:
   *     summary: Retrieve a list of members
   *     tags: [Member]
   *     responses:
   *       200:
   *         description: The list of the members
   */
  @Get()
  async getHello(@Res() res: Response, @Body() body: any): Promise<any> {
    return await this.memberService.getLogin(body);
  }

  /**
   * @swagger
   * /api/member/login:
   *   post:
   *     summary: Login a member
   *     tags: [Member]
   *     responses:
   *       200:
   *         description: The member was successfully logged in
   */
  @Post('login')
  @ApiOperation({ summary: '登入' })
  @Public()
  async login(
    @Res() res: Response,
    @Body() body: MemberLoginModel,
  ): Promise<any> {
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
  @ApiOperation({ summary: '取得玩家資訊' })
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
