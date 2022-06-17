import { forwardRef, Module } from '@nestjs/common';
import { WinsocketModule } from 'src/winsocket/winsocket.module';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [forwardRef(() => WinsocketModule)],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
