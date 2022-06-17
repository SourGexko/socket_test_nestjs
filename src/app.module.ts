import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { EventsGateway } from './events/events.gateway';
import * as net from 'net';
import { WinsocketModule } from './winsocket/winsocket.module';

@Module({
  imports: [EventsModule, WinsocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
