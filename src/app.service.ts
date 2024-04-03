import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '禪心儀表板: 代表冥想和平靜，這個名稱暗示了一個平靜且直觀的儀表板。';
  }
}
