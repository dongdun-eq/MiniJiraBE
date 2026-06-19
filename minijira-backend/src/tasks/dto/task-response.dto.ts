import { ApiProperty } from '@nestjs/swagger';
import {
  SWAGGER_RESPONSE_ASSIGNEE_DESC,
  SWAGGER_RESPONSE_ASSIGNEE_ID_EXAMPLE,
  SWAGGER_RESPONSE_ASSIGNEE_NAME_EXAMPLE,
  SWAGGER_RESPONSE_CREATOR_DESC,
  SWAGGER_RESPONSE_CREATOR_ID_EXAMPLE,
  SWAGGER_RESPONSE_CREATOR_NAME_EXAMPLE,
  SWAGGER_RESPONSE_TASK_ID_DESC,
  SWAGGER_RESPONSE_TASK_ID_EXAMPLE,
  SWAGGER_TASK_DESCRIPTION_DESC,
  SWAGGER_TASK_DESCRIPTION_EXAMPLE,
  SWAGGER_TASK_DUE_DATE_DESC,
  SWAGGER_TASK_DUE_DATE_EXAMPLE,
  SWAGGER_TASK_POSITION_DESC,
  SWAGGER_TASK_POSITION_EXAMPLE,
  SWAGGER_TASK_PRIORITY_DESC,
  SWAGGER_TASK_PRIORITY_EXAMPLE,
  SWAGGER_TASK_STATUS_DESC,
  SWAGGER_TASK_STATUS_EXAMPLE,
  SWAGGER_TASK_TITLE_DESC,
  SWAGGER_TASK_TITLE_EXAMPLE,
  SWAGGER_TASK_UPDATED_AT_DESC,
  SWAGGER_TASK_UPDATED_AT_EXAMPLE,
} from '../tasks.constant';
import { Priority, Status } from '../../../generated/prisma/enums';
import {
  SWAGGER_USER_CREATED_AT_DESC,
  SWAGGER_USER_CREATED_AT_EXAMPLE,
} from '../../auth/auth.constant';

// Object lồng bên trong task biểu diễn Assignee
class TaskAssigneeDto {
  @ApiProperty({ example: SWAGGER_RESPONSE_ASSIGNEE_ID_EXAMPLE })
  id!: string;

  @ApiProperty({ example: SWAGGER_RESPONSE_ASSIGNEE_NAME_EXAMPLE })
  name!: string;
}

class TaskCreatorDto {
  @ApiProperty({ example: SWAGGER_RESPONSE_CREATOR_ID_EXAMPLE })
  id!: string;

  @ApiProperty({ example: SWAGGER_RESPONSE_CREATOR_NAME_EXAMPLE })
  name!: string;
}

export class TaskResponseDto {
  @ApiProperty({
    example: SWAGGER_RESPONSE_TASK_ID_EXAMPLE,
    description: SWAGGER_RESPONSE_TASK_ID_DESC,
  })
  id!: string;

  @ApiProperty({
    example: SWAGGER_TASK_TITLE_EXAMPLE,
    description: SWAGGER_TASK_TITLE_DESC,
  })
  title!: string;

  @ApiProperty({
    example: SWAGGER_TASK_PRIORITY_EXAMPLE,
    description: SWAGGER_TASK_PRIORITY_DESC,
    enum: Priority,
  })
  priority!: string;

  @ApiProperty({
    type: TaskAssigneeDto,
    description: SWAGGER_RESPONSE_ASSIGNEE_DESC,
    nullable: true,
  })
  assignee!: TaskAssigneeDto | null;

  @ApiProperty({
    example: SWAGGER_TASK_STATUS_EXAMPLE,
    description: SWAGGER_TASK_STATUS_DESC,
    enum: Status,
  })
  status!: string;

  @ApiProperty({
    example: SWAGGER_USER_CREATED_AT_EXAMPLE,
    description: SWAGGER_USER_CREATED_AT_DESC,
  })
  createdAt!: Date;
}

export class DetailTaskResponseDto extends TaskResponseDto {
  @ApiProperty({
    example: SWAGGER_TASK_DESCRIPTION_EXAMPLE,
    description: SWAGGER_TASK_DESCRIPTION_DESC,
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    example: SWAGGER_TASK_POSITION_EXAMPLE,
    description: SWAGGER_TASK_POSITION_DESC,
  })
  position!: string;

  @ApiProperty({
    type: TaskCreatorDto,
    description: SWAGGER_RESPONSE_CREATOR_DESC,
  })
  creator!: TaskCreatorDto;

  @ApiProperty({
    example: SWAGGER_TASK_DUE_DATE_EXAMPLE,
    description: SWAGGER_TASK_DUE_DATE_DESC,
    nullable: true,
  })
  dueDate!: Date | null;

  @ApiProperty({
    example: SWAGGER_TASK_UPDATED_AT_EXAMPLE,
    description: SWAGGER_TASK_UPDATED_AT_DESC,
  })
  updatedAt!: Date;
}
