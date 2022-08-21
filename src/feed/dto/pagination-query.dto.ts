import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ minimum: 1 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  limit: number;

  @ApiProperty({ minimum: 1 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(0)
  page: number;
}
