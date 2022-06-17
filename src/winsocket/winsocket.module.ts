import { forwardRef, Module } from '@nestjs/common';
import { WinsocketService } from './winsocket.service';
import { WinsocketController } from './winsocket.controller';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [forwardRef(() => EventsModule)],
  providers: [WinsocketService],
  controllers: [WinsocketController],
  exports: [WinsocketService],
})
export class WinsocketModule {}
