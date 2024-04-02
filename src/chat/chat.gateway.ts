import { WebSocketGateway, SubscribeMessage, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust in production for security
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join_room')
  handleJoinRoom(@MessageBody() data: { userId: string; adminId: string }, @ConnectedSocket() client: Socket) {
    const roomId = this.createRoomId(data.userId, data.adminId);
    client.join(roomId);
    console.log(`Client ${client.id} joined room: ${roomId}`);
  }

  @SubscribeMessage('send_message')
  handleMessage(@MessageBody() data: { roomId: string; message: string; senderId: string }): void {
    this.server.to(data.roomId).emit('receive_message', data);
  }

  private createRoomId(userId: string, adminId: string): string {
    // Ensure consistent room ID generation regardless of who initiates the chat
    return `chat_${userId}_${adminId}`;
  }
}
