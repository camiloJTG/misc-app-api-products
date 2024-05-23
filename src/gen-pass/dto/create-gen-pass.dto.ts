import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';

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

  @IsInt()
  @Min(1)
  @Max(200)
  length: number;
}
