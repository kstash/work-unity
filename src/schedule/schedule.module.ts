import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { EventRepository } from './repository/event.repository';
import { ApprovalRepository } from './repository/approval.repository';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, EventRepository, ApprovalRepository],
})
export class ScheduleModule {}
