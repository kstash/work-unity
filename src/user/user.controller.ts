import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './enitity/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('')
  createUser(@Body() createDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createDto);
  }

  @Get('/:id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }
}
