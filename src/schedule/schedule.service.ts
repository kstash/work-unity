import { Injectable } from '@nestjs/common';
import { EventRepository } from './repository/event.repository';
import { ApprovalRepository } from './repository/approval.repository';

@Injectable()
export class ScheduleService {
    constructor(
        private readonly eventRepository: EventRepository,
        private readonly approvalRepository: ApprovalRepository
    ) {}

    
}
