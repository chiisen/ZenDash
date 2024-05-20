import { Injectable } from '@nestjs/common';
import { ConnectionPool, Request, config } from 'mssql';
import * as jwt from 'jsonwebtoken';
import * as cache from 'memory-cache';
import { MemberLoginModel, UserInfoModel } from 'src/model/member-login.model';

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
  async getLogin(data: MemberLoginModel): Promise<any> {
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

    const errorMessage: Map<number, string> = new Map([
      [1, '正常'],
      [-1, '其它錯誤'],
      [-2, '帳號或密碼錯誤'],
      [-4, '會員在線'],
      [-5, '停用'],
      [-6, '會員鎖定'],
      [-7, '會員凍結'],
      [-8, '無此帳號'],
      [-9, '組別不匹配'],
    ]);

    let message = '';
    if (errorMessage.has(result.recordset[0].ErrorCode)) {
      // 鍵存在於 map 中
      message = errorMessage.get(result.recordset[0].ErrorCode);
    }

    if (result.recordset[0].ErrorCode === 1) {
      const forwardGameCurrency = this.H1WalletCurrency(
        result.recordset[0].huilvtype,
      );
      const timestamp = Math.floor(Date.now() / 1000) + 1800;
      const token = jwt.sign(
        {
          password: data.password,
          username: data.account,
          clubid: result.recordset[0].clubid,
          clubename: result.recordset[0].clubename,
          clubcname: result.recordset[0].clubcname,
          franchiserid: result.recordset[0].franchiserid,
          zuBie: result.recordset[0].ZuBie,
          huilvtype: result.recordset[0].huilvtype,
          forwardGameCurrency,
          site_id: '',
          timestamp,
          isSocialLogin: false,
          union_id: result.recordset[0].Union_id,
          unitKey: result.recordset[0].UnitKey,
        },
        '57d1b8f4e02eced059d3da10de9dcde44319bbf4ab667e43edfe74fb53ee8429',
        {
          algorithm: 'HS256',
          issuer: 'appapi_dev_jwt',
          audience: 'appapi_adu',
          expiresIn: 10080 * 60, // expires in 10080 minutes
        },
        { expiresIn: '1h' },
      ); // token will expire in 1 hour

      try {
        const decoded = jwt.verify(
          token,
          '57d1b8f4e02eced059d3da10de9dcde44319bbf4ab667e43edfe74fb53ee8429',
        );
        const clubid = decoded.clubid;
        console.log(clubid);
      } catch (err) {
        console.error('Failed to decode JWT', err);
      }

      return {
        status: 1,
        desc: 'SUCCESS',
        result: {
          token: token,
          clubid: result.recordset[0].clubid,
          clubename: result.recordset[0].clubename,
          clubcname: result.recordset[0].clubcname,
          huilvtype: result.recordset[0].huilvtype,
          now_xinyong: result.recordset[0].now_xinyong,
          isTest: result.recordset[0].IsTest,
          zuBie: result.recordset[0].ZuBie,
          isSocialLogin: false,
          collet: result.recordset[0].Collet,
          payment: result.recordset[0].Payment,
          collet_isEnabled: result.recordset[0].Collet_isEnabled,
          payment_isEnabled: result.recordset[0].Payment_isEnabled,
          expiresAt: 1713930586,
          mustChangePasssword: result.recordset[0].mustChangePasssword,
          union_id: result.recordset[0].Union_id,
          unitKey: result.recordset[0].UnitKey,
        },
        errorDetail: null,
      };
    } else {
      return {
        status: 0,
        desc: 'FAILURE',
        result: null,
        errorDetail: message,
      };
    }
  }

  /**
   * 取得(轉換)H1Wallet進線時的統一貨幣代碼
   * @param currency
   * @returns
   */
  H1WalletCurrency(currency: string): string {
    currency = currency.toUpperCase();
    switch (currency) {
      case 'NT':
        return 'TWD';
      case 'HK':
        return 'HKD';
      case 'USA':
        return 'USD';
      default:
        return currency;
    }
  }

  /**
   * 取得玩家資訊
   */
  async getUserInfo(data: UserInfoModel): Promise<any> {
    let value = cache.get('user-info');
    if (!value) {
      const pool = new ConnectionPool(this.dbConfig);
      await pool.connect();

      const request = new Request(pool);
      const result = await request
        .input('account', data.account + '%')
        .query('SELECT * FROM T_Club WHERE (Club_Ename LIKE @account)');

      await pool.close();

      value = result.recordset; // or result.returnValue depending on your SP
      cache.put('user-info', value, 60000); // cache for 60 seconds
    }
    return value;
  }
  /**
   * 更新會員狀態
   */
  async updateMemberStatus(data: any): Promise<any> {
    const pool = new ConnectionPool(this.dbConfig);
    await pool.connect();

    const request = new Request(pool);
    const result = await request
      .input('status', data.status)
      .input('club_id', data.club_id)
      .query(
        `UPDATE [T_Club] SET ${data.field_name} = @status WHERE Club_id = @club_id `,
      );

    await pool.close();

    return result.recordsets;
  }
}
