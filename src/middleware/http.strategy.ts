import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { Logger } from '@nestjs/common';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(token: string) {
    // 在這裡驗證您的 token
    // 如果 token 是有效的，則返回 token 的使用者
    const logger = new Logger('validate');

    if (!token || token.trim() === '') {
      logger.log('Token is empty or null');
      // 如果 token 是無效的，則拋出一個異常
      throw new UnauthorizedException('Token is empty or null');
    }

    logger.log(`token: ${token}`);
    return token;
  }
}
