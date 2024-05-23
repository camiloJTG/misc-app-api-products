import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenPassDto } from './dto';
import { GenPass } from './entities';

@Injectable()
export class GenPassService {
  private readonly uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private readonly lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  private readonly numberChars = '0123456789';
  private readonly specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  constructor(
    @InjectRepository(GenPass)
    private readonly genPassRepository: Repository<GenPass>,
  ) {}

  async create(createGenPassDto: CreateGenPassDto) {
    const credential = this.generateCredential(createGenPassDto);
    const genPass = this.genPassRepository.create(createGenPassDto);
    await this.genPassRepository.save(genPass);
    return { credential };
  }

  private generateCredential(params: CreateGenPassDto) {
    const {
      includeLowercase,
      includeNumbers,
      includeSpecialCharacters,
      includeUppercase,
      passwordLength,
    } = params;
    let characters = '';
    let credential = '';

    if (includeLowercase) characters += this.lowercaseChars;
    if (includeUppercase) characters += this.uppercaseChars;
    if (includeNumbers) characters += this.numberChars;
    if (includeSpecialCharacters) characters += this.specialChars;

    if (characters.length <= 0)
      throw new BadRequestException(
        'At least one character type must be selected',
      );

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      credential += characters[randomIndex];
    }
    return credential;
  }
}
