import { Controller, Get, Query } from '@nestjs/common';
import { WinsocketService } from './winsocket.service';

@Controller('winsocket')
export class WinsocketController {
  constructor(private readonly winsocketService: WinsocketService) {}
  @Get('/connect')
  connect() {
    return this.winsocketService.connect();
  }

  @Get('/send')
  send(@Query('message') message: string) {
    this.winsocketService.send(message);
  }

  @Get('/disconnect')
  disconnect() {
    return this.winsocketService.disconnect();
  }
}
