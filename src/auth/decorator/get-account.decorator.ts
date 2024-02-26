import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Account } from 'src/user/enitity/account.entity';
import { ProfileAccount } from '../interface/profileAccount.interface';

export const GetAccount = createParamDecorator(
  (data, ctx: ExecutionContext): Account | ProfileAccount => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
