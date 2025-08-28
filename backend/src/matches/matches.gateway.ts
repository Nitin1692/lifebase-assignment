import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})
export class MatchesGateway {
  @WebSocketServer()
  server: Server;

  // send commentary to a specific match room
  broadcastCommentary(matchId: number, commentary: any) {
    console.log('Broadcasting to room:', `match_${matchId}`, commentary);
    this.server.to(`match_${matchId}`).emit('commentaryUpdate', commentary);
  }

  // handle clients joining a match - FIXED VERSION
  @SubscribeMessage('joinMatch')
  handleJoinMatch(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { matchId: number }
  ) {
    const roomName = `match_${data.matchId}`;
    console.log('Client joining room:', roomName, 'Socket ID:', client.id);
    
    // Join the client to the room
    client.join(roomName);
    
    // Optional: Send confirmation back to client
    client.emit('joinedRoom', { matchId: data.matchId, room: roomName });
    
    return { success: true, room: roomName };
  }

  // Optional: handle clients leaving a match
  @SubscribeMessage('leaveMatch')
  handleLeaveMatch(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { matchId: number }
  ) {
    const roomName = `match_${data.matchId}`;
    console.log('Client leaving room:', roomName, 'Socket ID:', client.id);
    client.leave(roomName);
    return { success: true, room: roomName };
  }

  // Handle disconnection
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  // Handle connection
  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }
}