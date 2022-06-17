import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as net from 'net';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class WinsocketService {
  constructor(
    @Inject(forwardRef(() => EventsGateway))
    private readonly eventsGateway: EventsGateway,
  ) {}
  socket: net.Socket;

  async connect() {
    if (this.socket) {
      throw new HttpException('already connected', 400);
    }
    this.socket = net.connect({ port: 4001 });
    this.socket.on('connect', function () {
      console.log('connected to server!');
    });
    this.socket.on('data', async (chunk) => {
      console.log('recv:' + chunk);
      this.eventsGateway.fromWinsocket({
        name: 'server',
        message: chunk.toString(),
      });
    });
    this.socket.on('error', function (err) {
      console.log(err);
    });
    // connection에서 timeout이 발생하면 메시지 출력
    this.socket.on('timeout', function () {
      console.log('connection timeout.');
    });
    this.socket.on('end', function () {
      console.log('disconnected.');
    });
  }

  recieve(message: string) {
    this.eventsGateway.handleEvent(message);
  }

  async send(message: string) {
    this.socket.write(message);
  }

  async disconnect() {
    this.socket.end();
  }
}
