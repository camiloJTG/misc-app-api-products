import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';
import { Shortener } from './entities';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shortener]), ConfigModule, CommonModule],
  controllers: [ShortenerController],
  providers: [ShortenerService],
})
export class ShortenerModule {}
