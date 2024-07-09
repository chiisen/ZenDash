import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoModel {
  /**
   * 帳號: Club_Ename
   */
  @ApiProperty({ description: '帳號: Club_Ename' })
  @IsNotEmpty()
  account: string;
}
