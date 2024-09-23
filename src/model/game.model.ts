import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AllGameTokenModel {
  /**
   * 廠商編號
   */
  @ApiProperty({ description: '廠商編號' })
  @IsNotEmpty()
  thirdParty_id: string;
}

export class ServerIdModel {
  /**
   * 廠商編號
   */
  @ApiProperty({ description: '廠商編號' })
  @IsNotEmpty()
  thirdParty_id: string;
}

export class GameListModel {
  /**
   * 廠商編號
   */
  @ApiProperty({ description: '廠商編號' })
  @IsNotEmpty()
  thirdParty_id: string;
}

export class BankInfoModel {
  /**
   * 廠商編號
   */
  @ApiProperty({ description: '銀行資料' })
  @IsNotEmpty()
  club_id: string;
}
