import { ApiProperty } from '@nestjs/swagger';
import { TaskResponseDto } from './task-response.dto';

export class SingleTaskResponseDto {
  @ApiProperty({ type: TaskResponseDto })
  data!: TaskResponseDto;
}
