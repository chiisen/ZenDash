import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// Step 1: 導入 GameService
import { GameService } from './game/game.service'; // 請根據您的文件結構調整路徑

@WebSocketGateway({
  cors: {
    origin: '*', // 允許所有來源
    methods: ['GET', 'POST'], // 允許的 HTTP 請求方法
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // 注入 GameService
  constructor(private gameService: GameService) {}

  @WebSocketServer()
  server: Server;

  // 處理消息
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Message from client ${client.id}: ${data}`);
    this.server.emit('message', data + ' @SERVER');
    console.log(`Client message: ${data}`);
    // 回傳訊息給發送消息的客戶端
    client.emit('response', `Received your message: ${data}`);
  }

  // 當客戶端連接時調用
  handleConnection(client: Socket, ...args: any[]): void {
    console.log(`Client connected: ${client.id} ${args}`);
    // 這裡可以添加更多的連接邏輯
  }

  // 當客戶端斷開連接時調用
  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
    // 這裡可以添加更多的斷開連接邏輯
  }

  @SubscribeMessage('getGameToken')
  async handlePlayGame(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    // Step 3: 呼叫 GameService 的方法
    try {
      const obj = JSON.parse(data);
      const gameInfo = await this.gameService.getGameToken(obj); // 假設 playGame 是 GameService 中的一個方法
      client.emit('getGameToken', gameInfo);
    } catch (error) {
      client.emit('error', error.message);
    }
  }
}
