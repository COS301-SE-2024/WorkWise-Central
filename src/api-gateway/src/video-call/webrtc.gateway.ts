import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  },
})
export class WebRTCGateway implements OnModuleInit {
  @WebSocketServer() server: Server;
  private rooms: Map<string, Set<string>> = new Map();

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on('disconnect', () => {
        this.handleDisconnect(socket);
      });
    });
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId);
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
    this.rooms.get(roomId).add(client.id);
    client.to(roomId).emit('user-joined', client.id);
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(client: Socket, roomId: string) {
    this.handleRoomLeave(client, roomId);
  }

  @SubscribeMessage('offer')
  handleOffer(client: Socket, payload: { target: string; offer: RTCSessionDescriptionInit }) {
    this.server.to(payload.target).emit('offer', {
      offer: payload.offer,
      offerSenderId: client.id,
    });
  }

  @SubscribeMessage('answer')
  handleAnswer(client: Socket, payload: { target: string; answer: RTCSessionDescriptionInit }) {
    this.server.to(payload.target).emit('answer', {
      answer: payload.answer,
      answerSenderId: client.id,
    });
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(client: Socket, payload: { target: string; candidate: RTCIceCandidate }) {
    this.server.to(payload.target).emit('ice-candidate', {
      candidate: payload.candidate,
      candidateSenderId: client.id,
    });
  }

  private handleDisconnect(client: Socket) {
    for (const [roomId, clients] of this.rooms.entries()) {
      if (clients.has(client.id)) {
        this.handleRoomLeave(client, roomId);
        break;
      }
    }
  }

  private handleRoomLeave(client: Socket, roomId: string) {
    client.leave(roomId);
    const roomClients = this.rooms.get(roomId);
    if (roomClients) {
      roomClients.delete(client.id);
      if (roomClients.size === 0) {
        this.rooms.delete(roomId);
      } else {
        client.to(roomId).emit('user-left', client.id);
      }
    }
  }
}
