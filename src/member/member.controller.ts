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
import { LoggingInterceptor } from '../middleware/logging.interceptor';
import { MemberLoginModel } from '../model/member-login.model';
import { UserInfoModel } from '../model/member-userinfo.model';
import { UpdateMemberStatusModel } from '../model/member-update-member-status.model';
import { GetBankPasswordModel } from '../model/member-get-bank-password.model';
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
  async userInfo(
    @Res() res: Response,
    @Body() body: UserInfoModel,
  ): Promise<any> {
    const result: any = await this.memberService.getUserInfo(body);
    return res.status(200).format({
      'application/json': function () {
        res.send(result);
      },
    });
  }
  /**
   * 更新會員狀態
   */
  @Post('/UpdateMemberStatus')
  @ApiOperation({ summary: '更新會員狀態' })
  @Public()
  async UpdateMemberStatus(
    @Res() res: Response,
    @Body() body: UpdateMemberStatusModel,
  ): Promise<any> {
    const result: string = await this.memberService.updateMemberStatus(body);
    return res.status(200).format({
      'application/json': function () {
        res.send(result);
      },
    });
  }
  /**
   * 查詢資金密碼
   */
  @Post('/GetBankPassword')
  @ApiOperation({ summary: '查詢資金密碼' })
  @Public()
  async GetBankPassword(
    @Res() res: Response,
    @Body() body: GetBankPasswordModel,
  ): Promise<any> {
    const result: string = await this.memberService.getBankPassword(body);
    return res.status(200).format({
      'application/json': function () {
        res.send(result);
      },
    });
  }
}
