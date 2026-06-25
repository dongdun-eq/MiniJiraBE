import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ListResponseDto } from '../share/dto/list-response.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ListResponseDto<UserResponseDto>> {
    const users = await this.prisma.user.findMany();

    const mappedUsers = users.map((user) => ({ id: user.id, name: user.name }));

    return {
      data: mappedUsers,
    };
  }
}
