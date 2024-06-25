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

@WebSocketGateway({
  cors: {
    origin: '*', // 允許所有來源
    methods: ['GET', 'POST'], // 允許的 HTTP 請求方法
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
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
}
