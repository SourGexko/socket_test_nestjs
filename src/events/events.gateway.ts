import { forwardRef, Inject, Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WinsocketService } from 'src/winsocket/winsocket.service';

@WebSocketGateway({ cors: true })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(forwardRef(() => WinsocketService))
    private readonly winsocketService: WinsocketService,
  ) {
    this.winsocketService.connect();
  }

  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('EventsGateway');

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: any): string {
    this.logger.log(data);
    this.winsocketService.send(`${data.name}: ${data.message}`);
    return data;
  }

  @SubscribeMessage('events')
  fromWinsocket(@MessageBody() data: any): string {
    console.log(data);
    this.server.emit('events', data);
    return data;
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected : ${client.id}`);
  }
}
