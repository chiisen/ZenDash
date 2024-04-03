import { Res, Controller, Post, Get } from '@nestjs/common';
import { MemberService } from './member.service';
import { Public } from '../public.decorator';
import { Response } from 'express';

@Controller('/api/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  getHello(): string {
    return this.memberService.getLogin();
  }
  @Post('login')
  @Public()
  login(@Res() res: Response): any {
    const result: string = this.memberService.getLogin();
    return res.format({
      'application/json': function () {
        res.send(result);
      },
    });
  }
}
