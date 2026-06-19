import { ApiProperty } from '@nestjs/swagger';
import { DetailTaskResponseDto } from './task-response.dto';
import { PaginationMetaDto } from '../../common/dto/pagination.dto';

export class ListTasksResponseDto {
  @ApiProperty({ type: [DetailTaskResponseDto] })
  data!: DetailTaskResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  pagination!: PaginationMetaDto;
}
