import { Injectable } from '@nestjs/common';
import { ConnectionPool, Request, config } from 'mssql';

@Injectable()
export class MemberService {
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
   * 取得登入資訊
   */
  async getLogin(data: any): Promise<any> {
    const pool = new ConnectionPool(this.dbConfig);
    await pool.connect();

    const request = new Request(pool);
    const result = await request
      .input('clubEName', data.account)
      .input('password', data.password)
      .input('IP', '127.0.0.1')
      .input('UidKey', data.uidKey)
      .input('EnamePasswordUnioid', 'A')
      .execute('NSP_Common_UserLogin_AloneLogin');

    await pool.close();

    return result.recordset; // or result.returnValue depending on your SP
  }
  /**
   * 取得玩家資訊
   */
  async getUserInfo(data: any): Promise<any> {
    const pool = new ConnectionPool(this.dbConfig);
    await pool.connect();

    const request = new Request(pool);
    const result = await request
      .input('account', data.account + '%')
      .query('SELECT * FROM T_Club WHERE (Club_Ename LIKE @account)');

    await pool.close();

    return result.recordset; // or result.returnValue depending on your SP
  }
}
