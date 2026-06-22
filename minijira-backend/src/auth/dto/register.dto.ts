import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import {
  EMAIL_INVALID_MESSAGE,
  IMAGE_URL_NOT_STRING,
  NAME_EMPTY_MESSAGE,
  NAME_MIN_LENGTH_MESSAGE,
  NAME_NOT_STRING_MESSAGE,
  PASSWORD_EMPTY_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
  PASSWORD_NOT_STRING_MESSAGE,
  SWAGGER_AVATAR_DESC,
  SWAGGER_AVATAR_EXAMPLE,
  SWAGGER_EMAIL_DESC,
  SWAGGER_EMAIL_EXAMPLE,
  SWAGGER_NAME_DESC,
  SWAGGER_NAME_EXAMPLE,
  SWAGGER_PASSWORD_DESC,
  SWAGGER_PASSWORD_EXAMPLE,
} from '../auth.constant';

export class RegisterDto {
  @ApiProperty({
    example: SWAGGER_EMAIL_EXAMPLE,
    description: SWAGGER_EMAIL_DESC,
  })
  @IsEmail({}, { message: EMAIL_INVALID_MESSAGE })
  email!: string;

  @ApiProperty({
    example: SWAGGER_PASSWORD_EXAMPLE,
    description: SWAGGER_PASSWORD_DESC,
    format: 'password',
  })
  @IsString({ message: PASSWORD_NOT_STRING_MESSAGE })
  @IsNotEmpty({ message: PASSWORD_EMPTY_MESSAGE })
  @MinLength(8, { message: PASSWORD_MIN_LENGTH_MESSAGE })
  password!: string;

  @ApiProperty({
    example: SWAGGER_NAME_EXAMPLE,
    description: SWAGGER_NAME_DESC,
  })
  @IsString({ message: NAME_NOT_STRING_MESSAGE })
  @IsNotEmpty({ message: NAME_EMPTY_MESSAGE })
  @MinLength(6, { message: NAME_MIN_LENGTH_MESSAGE })
  name!: string;

  @ApiProperty({
    example: SWAGGER_AVATAR_EXAMPLE,
    description: SWAGGER_AVATAR_DESC,
    required: false,
  })
  @IsOptional()
  @IsString({ message: IMAGE_URL_NOT_STRING, always: false })
  avatarUrl?: string;
}
