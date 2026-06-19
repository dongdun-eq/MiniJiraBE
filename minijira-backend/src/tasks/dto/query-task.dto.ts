import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Priority, Status } from '../../../generated/prisma/enums';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../common/common.constant';
import {
  QUERY_TASK_ASSIGNEE_ID_NOT_STRING_MESSAGE,
  QUERY_TASK_LIMIT_MIN_MESSAGE,
  QUERY_TASK_LIMIT_NOT_INT_MESSAGE,
  QUERY_TASK_PAGE_MIN_MESSAGE,
  QUERY_TASK_PAGE_NOT_INT_MESSAGE,
  QUERY_TASK_PRIORITY_INVALID_MESSAGE,
  QUERY_TASK_STATUS_INVALID_MESSAGE,
  SWAGGER_QUERY_TASK_ASSIGNEE_DESC,
  SWAGGER_QUERY_TASK_ASSIGNEE_EXAMPLE,
  SWAGGER_QUERY_TASK_LIMIT_DESC,
  SWAGGER_QUERY_TASK_PAGE_DESC,
  SWAGGER_QUERY_TASK_PAGE_EXAMPLE,
  SWAGGER_QUERY_TASK_PRIORITY_DESC,
  SWAGGER_QUERY_TASK_STATUS_DESC,
} from '../tasks.constant';

export class QueryTaskDto {
  @ApiPropertyOptional({
    enum: Status,
    description: SWAGGER_QUERY_TASK_STATUS_DESC,
  })
  @IsOptional()
  @IsEnum(Status, { message: QUERY_TASK_STATUS_INVALID_MESSAGE })
  status?: Status;

  @ApiPropertyOptional({
    enum: Priority,
    description: SWAGGER_QUERY_TASK_PRIORITY_DESC,
  })
  @IsOptional()
  @IsEnum(Priority, { message: QUERY_TASK_PRIORITY_INVALID_MESSAGE })
  priority?: Priority;

  @ApiPropertyOptional({
    example: SWAGGER_QUERY_TASK_ASSIGNEE_EXAMPLE,
    description: SWAGGER_QUERY_TASK_ASSIGNEE_DESC,
  })
  @IsOptional()
  @IsString({ message: QUERY_TASK_ASSIGNEE_ID_NOT_STRING_MESSAGE })
  assigneeId?: string;

  @ApiPropertyOptional({
    example: SWAGGER_QUERY_TASK_PAGE_EXAMPLE,
    description: SWAGGER_QUERY_TASK_PAGE_DESC,
  })
  @IsOptional()
  @Type(() => Number) // query string luôn là string -> ép kiểu về number trước khi validate
  @IsInt({ message: QUERY_TASK_PAGE_NOT_INT_MESSAGE })
  @Min(1, { message: QUERY_TASK_PAGE_MIN_MESSAGE })
  page?: number = DEFAULT_PAGE;

  @ApiPropertyOptional({
    example: DEFAULT_PAGE_SIZE,
    description: SWAGGER_QUERY_TASK_LIMIT_DESC,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: QUERY_TASK_LIMIT_NOT_INT_MESSAGE })
  @Min(1, { message: QUERY_TASK_LIMIT_MIN_MESSAGE })
  limit?: number = DEFAULT_PAGE_SIZE;
}
