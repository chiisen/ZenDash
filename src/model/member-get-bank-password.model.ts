import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBankPasswordModel {
  /**
   * 帳號編號
   */
  @ApiProperty({ description: '帳號編號' })
  @IsNotEmpty()
  club_id: string;
}
