import { Controller, Body, Post, Get, Redirect, Param } from '@nestjs/common';
import { CreateShortenerDto } from './dto';
import { ShortenerService } from './shortener.service';

@Controller('short')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post()
  create(@Body() createShortenerDto: CreateShortenerDto) {
    return this.shortenerService.create(createShortenerDto);
  }

  @Get(':id')
  @Redirect()
  async redirect(@Param('id') id: string) {
    const { originalUrl } = await this.shortenerService.findByShortener(id);
    return { url: originalUrl };
  }
}
