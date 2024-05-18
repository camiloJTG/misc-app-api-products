import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Shortener } from './entities';
import { CreateShortenerDto } from './dto';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class ShortenerService {
  private shortenerLength = this.configService.get<number>('SHORTENER_LENGTH');
  private appHost = this.configService.get<string>('APP_HOST');

  constructor(
    @InjectRepository(Shortener)
    private readonly shortenerRepository: Repository<Shortener>,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
  ) {}

  async create({ originalUrl }: CreateShortenerDto) {
    try {
      const shortener = await this.findByUrl(originalUrl);
      if (shortener.length > 0) return shortener[0];

      const { hash, shortenedUrl } = this.createShortenedUrl();
      const result = this.shortenerRepository.create({
        originalUrl,
        shortenedUrl,
        shortenedHash: hash,
      });
      return await this.shortenerRepository.save(result);
    } catch (error) {
      this.commonService.handleError(error);
    }
  }

  async findByShortener(id: string) {
    const result = await this.shortenerRepository.findOne({
      where: { shortenedHash: id },
    });
    if (!result) throw new NotFoundException([]);
    return result;
  }

  private async findByUrl(url: string) {
    return await this.shortenerRepository.find({ where: { originalUrl: url } });
  }

  private createShortenedUrl() {
    let hash = '';
    for (let i = 0; i < this.shortenerLength; i++) {
      const randomCharCode = Math.floor(Math.random() * (122 - 48 + 1)) + 48;
      if (
        (randomCharCode >= 58 && randomCharCode <= 64) ||
        (randomCharCode >= 91 && randomCharCode <= 96)
      ) {
        i--;
        continue;
      }
      const char = String.fromCharCode(randomCharCode);
      hash += char;
    }

    return { shortenedUrl: `${this.appHost}/${hash}`, hash };
  }
}
