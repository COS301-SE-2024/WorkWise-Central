import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class VideoConferencingController {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('signal')
  handleSignal(@MessageBody() data: { type: string; payload: any }): void {
    // Forward the signal to the intended recipient
    this.server.emit('signal', data);
  }
}
