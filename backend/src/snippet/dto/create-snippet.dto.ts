import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';

export enum SnippetType {
  LINK = 'link',
  NOTE = 'note',
  COMMAND = 'command',
}

export class CreateSnippetDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsEnum(SnippetType)
  type!: SnippetType;
}
