import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Account } from 'src/user/enitity/account.entity';

export const GetAccount = createParamDecorator((data, ctx: ExecutionContext): Account => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
