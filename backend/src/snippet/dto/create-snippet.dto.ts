import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { SnippetType } from '../../enums/enums';

export class CreateSnippetDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsEnum(SnippetType)
  type!: SnippetType;
}
