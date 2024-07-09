import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMemberStatusModel {
  /**
   * 帳號狀態
   */
  @ApiProperty({ description: '帳號狀態' })
  @IsNotEmpty()
  status: string;

  /**
   * 帳號編號
   */
  @ApiProperty({ description: '帳號編號' })
  @IsNotEmpty()
  club_id: string;

  /**
   * 欄位名稱
   */
  @ApiProperty({ description: '欄位名稱' })
  @IsNotEmpty()
  field_name: string;
}
