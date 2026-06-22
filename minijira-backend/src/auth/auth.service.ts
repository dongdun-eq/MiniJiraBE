import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterDto } from './dto/register.dto';
import { SingleResponseDto } from '../common/dto/single-response.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './dto/jwt-payload.type';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { DetailUserResponseDto } from '../users/dto/user-response.dto';
import { AuthenticationResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(
    dto: RegisterDto,
  ): Promise<SingleResponseDto<DetailUserResponseDto>> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password_hash: hashedPassword,
        ...(dto.avatarUrl && { avatar_url: dto.avatarUrl }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar_url: true,
        created_at: true,
      },
    });

    return {
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
        ...(user.avatar_url && { avatarUrl: user.avatar_url }),
      },
    };
  }

  async login(
    dto: LoginDto,
  ): Promise<SingleResponseDto<AuthenticationResponseDto>> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const token = this.jwtService.sign(payload);

    return {
      data: {
        accessToken: token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.created_at,
          avatarUrl: user.avatar_url ?? undefined,
        },
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    console.log('Fetched user profile:', user); // Debugging line

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return { user };
  }
}
