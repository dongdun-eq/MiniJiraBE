import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService, JwtStrategy],
})
export class TasksModule {}
