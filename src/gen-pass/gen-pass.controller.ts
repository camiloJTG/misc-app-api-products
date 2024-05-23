import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateGenPassDto } from './dto';
import { GenPassService } from './gen-pass.service';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('gen-pass')
export class GenPassController {
  constructor(private readonly genPassService: GenPassService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createGenPassDto: CreateGenPassDto) {
    return this.genPassService.create(createGenPassDto);
  }
}
