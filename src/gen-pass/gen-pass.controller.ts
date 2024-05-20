import { Controller, Post, Body } from '@nestjs/common';
import { CreateGenPassDto } from './dto';
import { GenPassService } from './gen-pass.service';

@Controller('gen-pass')
export class GenPassController {
  constructor(private readonly genPassService: GenPassService) {}

  @Post()
  create(@Body() createGenPassDto: CreateGenPassDto) {
    return this.genPassService.create(createGenPassDto);
  }
}
