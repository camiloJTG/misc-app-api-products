import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateGenPassDto {
  @IsBoolean()
  @IsOptional()
  includeUppercase: boolean;

  @IsBoolean()
  @IsOptional()
  includeLowercase: boolean;

  @IsBoolean()
  @IsOptional()
  includeNumbers: boolean;

  @IsBoolean()
  @IsOptional()
  includeSpecialCharacters: boolean;

  @IsNumber()
  @IsNotEmpty()
  length: number;
}
