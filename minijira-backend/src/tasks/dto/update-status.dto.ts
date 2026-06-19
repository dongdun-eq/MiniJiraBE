import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import {
  SWAGGER_TASK_POSITION_DESC,
  SWAGGER_TASK_POSITION_EXAMPLE,
  SWAGGER_TASK_STATUS_DESC,
  SWAGGER_TASK_STATUS_EXAMPLE,
  TASK_POSITION_NOT_STRING_MESSAGE,
  TASK_STATUS_INVALID_MESSAGE,
} from '../tasks.constant';
import { Status } from '../../../generated/prisma/enums';
import { NormalizeEnumString } from '../../common/common.decorator';

export class UpdateStatusTaskDto {
  @ApiProperty({
    example: SWAGGER_TASK_STATUS_EXAMPLE,
    description: SWAGGER_TASK_STATUS_DESC,
    enum: Status,
  })
  @NormalizeEnumString()
  @IsEnum(Status, { message: TASK_STATUS_INVALID_MESSAGE })
  @IsNotEmpty()
  status!: Status;

  @ApiProperty({
    example: SWAGGER_TASK_POSITION_EXAMPLE,
    description: SWAGGER_TASK_POSITION_DESC,
  })
  @IsString({ message: TASK_POSITION_NOT_STRING_MESSAGE })
  @IsNotEmpty()
  position!: string;
}
