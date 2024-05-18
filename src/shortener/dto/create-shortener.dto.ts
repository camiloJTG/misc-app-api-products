import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateShortenerDto {
  @IsUrl()
  @IsNotEmpty()
  originalUrl: string;
}
