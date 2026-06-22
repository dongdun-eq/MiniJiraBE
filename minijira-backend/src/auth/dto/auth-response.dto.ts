import { DetailUserResponseDto } from '../../users/dto/user-response.dto';

export class AuthenticationResponseDto {
  accessToken!: string;
  user!: DetailUserResponseDto;
}
