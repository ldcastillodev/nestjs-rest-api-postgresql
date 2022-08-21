import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';
// extends PaginationQueryDto
export class FilterQueryDto extends PaginationQueryDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  author: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  tag: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  storyTitle: string;
}
