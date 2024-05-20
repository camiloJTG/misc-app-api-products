import { Module } from '@nestjs/common';
import { GenPassService } from './gen-pass.service';
import { GenPassController } from './gen-pass.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenPass } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([GenPass])],
  controllers: [GenPassController],
  providers: [GenPassService],
})
export class GenPassModule {}
