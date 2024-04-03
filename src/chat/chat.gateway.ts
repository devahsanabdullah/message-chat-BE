import { WebSocketGateway, SubscribeMessage, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {ChatService} from './chat.service'
@WebSocketGateway({
  cors: {
    origin: '*', // Adjust in production for security
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private chatService: ChatService) {}

  @SubscribeMessage('join_room')
  handleJoinRoom(@MessageBody() data: { userId: string; adminId: string }, @ConnectedSocket() client: Socket) {
    const roomId = this.createRoomId(data.userId, data.adminId);
    client.join(roomId);
    console.log(`Client ${client.id} joined room: ${roomId}`);
  }

  @SubscribeMessage('send_message')
   async handleMessage(@MessageBody() data: { roomId: string; message: string; senderId: string; vendorId:string; userId:string}):  Promise<void>  {
    await this.chatService.create(data)
    this.server.to(data.roomId).emit('receive_message', data);
  }

  private createRoomId(userId: string, adminId: string): string {
    
    return `chat_${userId}_${adminId}`;
  }
}
