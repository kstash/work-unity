import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './enitity/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import { GetAccount } from 'src/auth/decorator/get-account.decorator';
import { ProfileAccount } from 'src/auth/interface/profileAccount.interface';
import { Response } from 'express';
import { ResourceService } from 'src/resource/resource.service';
import { ImageUploadInterceptor } from 'src/multer/multer.interceptor';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private resourceService: ResourceService,
  ) {}

  @Post('')
  createUser(@Body() createDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createDto);
  }

  @Get('/:id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post('/image')
  @UseInterceptors(ImageUploadInterceptor)
  @ApiOperation({
    summary: '사용자 이미지 업로드',
    description: '개인 사용자 이미지 업로드(기존 이미지 삭제)',
  })
  async uploadUserImage(
    @UploadedFile() imageFile: Express.Multer.File,
    @GetAccount() account: ProfileAccount,
    @Res() res: Response,
  ) {
    const { user } = account;
    const image = await this.resourceService.uploadImage(imageFile);
    const updatedUser = await this.userService.updateImage(user, image);
    return res.status(HttpStatus.CREATED).json(updatedUser);
  }
}
