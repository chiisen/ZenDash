import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {
  getLogin(): string {
    return `{
      "status": 1,
      "desc": "SUCCESS",
      "result": {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IkNGNzlBRTZBRERCQTYwQUQwMTgzNDczNTlCRDE0NEQyIiwidXNlcm5hbWUiOiJkYXR3MDUiLCJjbHViX2lkIjoiMjAwNTE2MTc4MiIsImNsdWJfZW5hbWUiOiJEYXR3MDUiLCJjbHViX2NuYW1lIjoiUUHmuKzoqablsI_ol43niYjnmoTlkI3nqLEiLCJmcmFuY2hpc2VyX2lkIjoiTEswMDEwMDAwMTAwMDAzIiwienViaWUiOiJEIiwiaHVpbHZ0eXBlIjoiVEhCIiwiZm9yd2FyZEdhbWVDdXJyZW5jeSI6IlRIQiIsInNpdGVfaWQiOiIiLCJ0aW1lc3RhbXAiOiIxNzEyMTYwODQ5IiwiaXNzb2NpYWxsb2dpbiI6IkZhbHNlIiwidW5pb25faWQiOiJEIiwidW5pdGtleSI6IjEzMTA0NiIsImV4cCI6MTcxMjczNTA0OSwiaXNzIjoiYXBwYXBpX2Rldl9qd3QiLCJhdWQiOiJhcHBhcGlfYWR1In0.zN4Kv4COe_0UIBa8DsB0rxpOswiyZee6VnOljjO_nV0",
          "clubid": "2005161782",
          "clubename": "Datw05",
          "clubcname": "QA測試小藍版的名稱",
          "huilvtype": "THB",
          "now_xinyong": 0.0000,
          "isTest": 1,
          "zuBie": "D",
          "isSocialLogin": false,
          "collet": "0",
          "payment": "0",
          "collet_isEnabled": false,
          "payment_isEnabled": false,
          "expiresAt": 1712735049,
          "mustChangePasssword": 1,
          "union_id": "D",
          "unitKey": "131046"
      }
  }`;
  }
}
