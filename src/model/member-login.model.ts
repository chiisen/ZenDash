import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MemberLoginModel {
  /**
   * 帳號: Club_Ename
   */
  @ApiProperty({ description: '帳號: Club_Ename' })
  @IsNotEmpty()
  account: string;

  /**
   * 密碼: MD5(password)
   */
  @ApiProperty({ description: '密碼: MD5(password)' })
  @IsNotEmpty()
  password: string;

  /**
   * 裝置id: Web | Mobile
   */
  @ApiProperty({ description: '裝置id: Web | Mobile' })
  @IsNotEmpty()
  uidKey: string;
}
