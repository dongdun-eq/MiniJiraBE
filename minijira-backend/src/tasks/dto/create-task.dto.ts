import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import {
  SWAGGER_TASK_ASSIGNEE_DESC,
  SWAGGER_TASK_ASSIGNEE_EXAMPLE,
  SWAGGER_TASK_DUE_DATE_DESC,
  SWAGGER_TASK_DUE_DATE_EXAMPLE,
  SWAGGER_TASK_PRIORITY_DESC,
  SWAGGER_TASK_PRIORITY_EXAMPLE,
  SWAGGER_TASK_STATUS_DESC,
  SWAGGER_TASK_STATUS_EXAMPLE,
  SWAGGER_TASK_TITLE_DESC,
  SWAGGER_TASK_TITLE_EXAMPLE,
  TASK_ASSIGNEE_ID_NOT_STRING_MESSAGE,
  TASK_DUE_DATE_INVALID_MESSAGE,
  TASK_PRIORITY_INVALID_MESSAGE,
  TASK_STATUS_INVALID_MESSAGE,
  TASK_TITLE_EMPTY_MESSAGE,
  TASK_TITLE_NOT_STRING_MESSAGE,
} from '../tasks.constant';
import { Priority, Status } from '../../../generated/prisma/enums';
import { NormalizeEnumString } from '../../share/share.decorator';

export class CreateTaskDto {
  @ApiProperty({
    example: SWAGGER_TASK_TITLE_EXAMPLE,
    description: SWAGGER_TASK_TITLE_DESC,
  })
  @IsString({ message: TASK_TITLE_NOT_STRING_MESSAGE })
  @IsNotEmpty({ message: TASK_TITLE_EMPTY_MESSAGE })
  title!: string;

  @ApiProperty({
    example: SWAGGER_TASK_PRIORITY_EXAMPLE,
    description: SWAGGER_TASK_PRIORITY_DESC,
    enum: Priority,
  })
  @IsEnum(Priority, { message: TASK_PRIORITY_INVALID_MESSAGE })
  priority!: Priority;

  @ApiProperty({
    example: SWAGGER_TASK_STATUS_EXAMPLE,
    description: SWAGGER_TASK_STATUS_DESC,
    enum: Status,
    required: false,
  })
  @NormalizeEnumString()
  @IsEnum(Status, { message: TASK_STATUS_INVALID_MESSAGE })
  @IsOptional()
  status?: Status;

  @ApiProperty({
    example: SWAGGER_TASK_ASSIGNEE_EXAMPLE,
    description: SWAGGER_TASK_ASSIGNEE_DESC,
    required: false,
  })
  @IsString({ message: TASK_ASSIGNEE_ID_NOT_STRING_MESSAGE })
  @IsOptional()
  assigneeId?: string;

  @ApiProperty({
    example: SWAGGER_TASK_DUE_DATE_EXAMPLE,
    description: SWAGGER_TASK_DUE_DATE_DESC,
    required: false,
  })
  @IsDateString({}, { message: TASK_DUE_DATE_INVALID_MESSAGE })
  @IsOptional()
  dueDate?: string;
}
