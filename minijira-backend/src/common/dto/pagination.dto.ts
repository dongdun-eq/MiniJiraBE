import { ApiProperty } from '@nestjs/swagger';
import {
  SWAGGER_PAG_LIMIT_DESC,
  SWAGGER_PAG_LIMIT_EXAMPLE,
  SWAGGER_PAG_PAGE_DESC,
  SWAGGER_PAG_PAGE_EXAMPLE,
  SWAGGER_PAG_TOTAL_DESC,
  SWAGGER_PAG_TOTAL_EXAMPLE,
  SWAGGER_PAG_TOTAL_PAGES_DESC,
  SWAGGER_PAG_TOTAL_PAGES_EXAMPLE,
} from '../common.constant';

export class PaginationMetaDto {
  @ApiProperty({
    example: SWAGGER_PAG_TOTAL_EXAMPLE,
    description: SWAGGER_PAG_TOTAL_DESC,
  })
  total!: number;

  @ApiProperty({
    example: SWAGGER_PAG_PAGE_EXAMPLE,
    description: SWAGGER_PAG_PAGE_DESC,
  })
  page!: number;

  @ApiProperty({
    example: SWAGGER_PAG_LIMIT_EXAMPLE,
    description: SWAGGER_PAG_LIMIT_DESC,
  })
  limit!: number;

  @ApiProperty({
    example: SWAGGER_PAG_TOTAL_PAGES_EXAMPLE,
    description: SWAGGER_PAG_TOTAL_PAGES_DESC,
  })
  totalPages!: number;
}
