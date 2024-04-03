import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  getW1RCGv3(): string {
    return `{
        "status": 1,
        "desc": "SUCCESS",
        "result": {
            "urlInfo": "https://dd.bacc55.com/Api/login?Token=18A7CF57-A7AF-4523-B691-4F31609B20F6&desk=1202&backurl=https://wwwpwa.royal-test.com/&lang=zh-TW"
        }
    }`;
  }
}
