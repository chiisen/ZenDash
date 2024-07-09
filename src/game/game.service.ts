import { Injectable } from '@nestjs/common';
import { ConnectionPool, Request, config } from 'mssql';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import {
  AllGameTokenModel,
  ServerIdModel,
  GameListModel,
} from '../model/game.model';

@Injectable()
export class GameService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
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
  private host = 'https://pwaapi.bacctest.com';
  /**
   * 取得進桌的進線 url (測試用)
   */
  getW1RCGv3(token: string): string {
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
  async getServerId(data: ServerIdModel): Promise<any> {
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
  /**
   * 服務狀態檢查
   */
  async getHealthCheck(): Promise<any> {
    const pool = new ConnectionPool(this.dbConfig);
    await pool.connect();

    const request = new Request(pool);
    const result = await request.query(
      "SELECT name, state_desc FROM sys.databases WHERE name = 'HKNetGame_HJ';",
    );

    await pool.close();

    const isRedisHealthy = await this.redis.ping();
    if (isRedisHealthy !== 'PONG') {
      throw new Error('Redis is not healthy');
    }
    console.log('Redis is healthy');

    return { isDbHealthy: result.recordset, isRedisHealthy }; // or result.returnValue depending on your SP
  }

  /**
   * 取得目前抓單的狀態
   */
  async getReportStatusCheck(): Promise<any> {
    const pool = new ConnectionPool(this.dbConfig);
    await pool.connect();

    const request = new Request(pool);
    const result = await request.query(
      'SELECT * FROM [HKNetGame_HJ].[dbo].[T_Club_Stake_Current]',
    );

    await pool.close();

    return result.recordset; // or result.returnValue depending on your SP
  }

  /**
   * 指定 thirdParty_id 測試所有遊戲的進線狀態
   */
  async getAllGameToken(data: AllGameTokenModel): Promise<any> {
    const pool = new ConnectionPool(this.dbConfig);
    await pool.connect();

    const request = new Request(pool);
    const result = await request
      .input('thirdParty_id', data.thirdParty_id + 'Room')
      .query(
        "SELECT TOP (200) * FROM [HKNetGame_HJ].[dbo].[T_Club] WHERE Active = 1 AND [Club_Ename] LIKE 'A00%' ORDER BY [Club_Ename]",
      );

    await pool.close();

    const gameList = await this.getGameListAsync(data);

    // 定義一個可以儲存任何類型資料的 list
    const list: any[] = [];

    let count = 1;
    for (const element of result.recordset) {
      await this.getGameTokenAsync(element, this, count, list, gameList, data); // 將您的異步操作放在這裡
      count += 1;
    }

    return list;
  }

  /**
   * 取得遊戲列表
   */
  async getGameListAsync(data: GameListModel): Promise<any> {
    // 取得遊戲列表
    const gameList = await this.callHttpGetApi(
      `${this.host}/webCache/GetSlotGame${data.thirdParty_id}List`,
    );

    return gameList;
  }

  /**
   * 轉換真實的 thirdParty_id 對應 Router
   */
  async getThirdPartyIdAsync(thirdParty_id: string): Promise<any> {
    switch (thirdParty_id) {
      case 'JDB':
        return 'W1JDB';
      case 'Royal':
        return 'W1Royal';
      case 'RSG':
        return 'W1Royal';
      case 'WM':
        return 'WMLive';
      case 'RCG':
        return 'W1RCGv2';
      default:
        return thirdParty_id;
    }
  }

  /**
   * 回饋進線狀態
   */
  async getGameTokenAsync(
    element: any,
    myThis: any,
    count: number,
    list: any[],
    gameList: any[],
    data: any,
  ): Promise<any> {
    try {
      if (gameList.length === 0) {
        return;
      }

      // 定义一个 JSON 对象
      const userInfo = {
        account: element.Club_Ename,
        password: element.Password,
        uidKey: 'web',
      };

      // 打印 JSON 对象
      console.log(userInfo);

      const login = await myThis.callHttpPostApi(
        `${this.host}/api/Member/login`,
        userInfo,
      );

      login.count = count;

      if (login.errorDetail == null) {
        // 定义一个 JSON 对象
        const gameInfo = {
          device: 'DESKTOP',
          lang: 'zh-tw',
          lobbyURL: 'https://ts.bacctest.com/close',
          gameCode: `${gameList[0].id}`,
        };

        // 進線的特例
        const thirdParty_id = await this.getThirdPartyIdAsync(
          data.thirdParty_id,
        );

        const gameToken = await myThis.callHttpPostApi(
          `${this.host}/api/Game/GetGameToken/${thirdParty_id}`,
          gameInfo,
          login.result.token,
        );

        // 新增回應的資訊
        gameToken.count = count;
        gameToken.id = gameList[0].id;
        gameToken.clubename = login.result.clubename;

        if (gameToken.errorDetail == null) {
          list.push(gameToken);

          gameList.splice(0, 1);
        }
      } else {
        list.push({ login: login.result });
      }
    } catch (error) {
      console.error('Error Message:', error.message);
    }
  }

  /**
   * 呼叫 Http POST
   */
  async callHttpPostApi(url: string, data: any, token?: string) {
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 在這裡加入 Bearer Token
        },
      });

      return response.data; // 返回響應中的資料
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error Message:', error.message);
        // 處理錯誤
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }

  /**
   * 呼叫 Http GET
   */
  async callHttpGetApi(url: string) {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data; // 返回響應中的資料
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error Message:', error.message);
        // 處理錯誤
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }
}
