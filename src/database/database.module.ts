import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptions } from './typeorm.option';

@Module({
    imports: [
        TypeOrmModule.forRootAsync(TypeOrmOptions)
    ]
})
export class DatabaseModule {}
