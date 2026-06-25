import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from './pagination.dto';

export class ListResponseDto<T> {
  @ApiProperty()
  data!: T[];

  @ApiProperty()
  pagination?: PaginationMetaDto;
}
