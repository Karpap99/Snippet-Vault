import { IsNumber, IsString } from 'class-validator';

export class SearchSnippetDto {
  @IsString()
  q!: string;

  @IsString()
  tag!: string;

  @IsNumber()
  page!: number;

  @IsNumber()
  limit!: number;

  @IsString()
  sortBy!: string;
}
