import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './enitity/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ]
})
export class UserModule {}
