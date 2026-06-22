import { ApiProperty } from '@nestjs/swagger';
import {
  SWAGGER_USER_AVATAR_DESC,
  SWAGGER_USER_AVATAR_EXAMPLE,
  SWAGGER_USER_CREATED_AT_DESC,
  SWAGGER_USER_CREATED_AT_EXAMPLE,
  SWAGGER_USER_EMAIL_DESC,
  SWAGGER_USER_EMAIL_EXAMPLE,
  SWAGGER_USER_ID_DESC,
  SWAGGER_USER_ID_EXAMPLE,
  SWAGGER_USER_NAME_DESC,
  SWAGGER_USER_NAME_EXAMPLE,
} from '../../auth/auth.constant';

export class UserResponseDto {
  @ApiProperty({
    example: SWAGGER_USER_ID_EXAMPLE,
    description: SWAGGER_USER_ID_DESC,
  })
  id!: string;

  @ApiProperty({
    example: SWAGGER_USER_NAME_EXAMPLE,
    description: SWAGGER_USER_NAME_DESC,
  })
  name!: string;
}

export class DetailUserResponseDto extends UserResponseDto {
  @ApiProperty({
    example: SWAGGER_USER_EMAIL_EXAMPLE,
    description: SWAGGER_USER_EMAIL_DESC,
  })
  email!: string;

  @ApiProperty({
    example: SWAGGER_USER_AVATAR_EXAMPLE,
    description: SWAGGER_USER_AVATAR_DESC,
    required: false,
  })
  avatarUrl?: string;

  @ApiProperty({
    example: SWAGGER_USER_CREATED_AT_EXAMPLE,
    description: SWAGGER_USER_CREATED_AT_DESC,
  })
  createdAt!: Date;
}
