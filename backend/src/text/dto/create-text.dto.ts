import { IsDefined, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateTextDto {
  @IsString()
  @IsDefined()
  text: string;

  @IsString()
  summary: string;

  @IsNumber()
  priority: number;

  @IsArray()
  tags: string[];

  @IsString()
  @IsDefined()
  link: string;
}
