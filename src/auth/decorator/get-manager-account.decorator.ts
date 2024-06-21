import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ManagerAccount } from '../interface/profileAccount.interface';

export const GetManagerAccount = createParamDecorator(
  (data, ctx: ExecutionContext): ManagerAccount => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
