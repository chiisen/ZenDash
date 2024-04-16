import { Injectable } from '@nestjs/common';
import { ConnectionPool, Request, config } from 'mssql';

@Injectable()
export class GameService {
  private dbConfig: config = {
    user: 'mobile_api',
    password: 'a:oY%~^E+VU0',
    server: 'daydb-svc.h1-db-dev',
    database: 'HKNetGame_HJ',
    options: {
      encrypt: true,
      trustServerCertificate: true, // enabling this option allows self-signed and expired certificates
    },
  };
  /**
   * 取得進桌的進線 url (測試用)
   */
  getW1RCGv3(): string {
    return `{
        "status": 1,
        "desc": "SUCCESS",
        "result": {
            "urlInfo": "https://dd.bacc55.com/Api/login?Token=18A7CF57-A7AF-4523-B691-4F31609B20F6&desk=1202&backurl=https://wwwpwa.royal-test.com/&lang=zh-TW"
        }
    }`;
  }
  /**
   * 用 thirdParty_id 取得 Server_id
   */
  async getServerId(data: any): Promise<any> {
    const pool = new ConnectionPool(this.dbConfig);
    await pool.connect();

    const request = new Request(pool);
    const result = await request
      .input('thirdParty_id', data.thirdParty_id + 'Room')
      .query(
        'SELECT Server_id FROM [HKNetGame_HJ].[dbo].[T_Server] WHERE Game_id = @thirdParty_id',
      );

    await pool.close();

    return result.recordset; // or result.returnValue depending on your SP
  }
}
