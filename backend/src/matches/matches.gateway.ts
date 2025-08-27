import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' }, // adjust in production
})
export class MatchesGateway {
  @WebSocketServer()
  server: Server;

  broadcastCommentary(commentary: any) {
    this.server.emit('commentaryUpdate', commentary);
  }
}
