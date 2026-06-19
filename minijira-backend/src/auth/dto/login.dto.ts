import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  EMAIL_INVALID_MESSAGE,
  PASSWORD_EMPTY_MESSAGE,
  PASSWORD_NOT_STRING_MESSAGE,
  SWAGGER_EMAIL_DESC,
  SWAGGER_EMAIL_EXAMPLE,
  SWAGGER_PASSWORD_DESC,
  SWAGGER_PASSWORD_EXAMPLE,
} from '../auth.constant';

export class LoginDto {
  @ApiProperty({
    example: SWAGGER_EMAIL_EXAMPLE,
    description: SWAGGER_EMAIL_DESC,
  })
  @IsEmail({}, { message: EMAIL_INVALID_MESSAGE })
  email!: string;

  @ApiProperty({
    example: SWAGGER_PASSWORD_EXAMPLE,
    description: SWAGGER_PASSWORD_DESC,
  })
  @IsString({ message: PASSWORD_NOT_STRING_MESSAGE })
  @IsNotEmpty({ message: PASSWORD_EMPTY_MESSAGE })
  password!: string;
}
