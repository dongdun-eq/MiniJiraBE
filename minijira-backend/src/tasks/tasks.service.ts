import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusTaskDto } from './dto/update-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../common/common.constant';
import { Prisma } from '../../generated/prisma/client';
import { ListTasksResponseDto } from './dto/list-tasks-reponse.dto';
import { DetailTaskResponseDto } from './dto/task-response.dto';
import { SingleTaskResponseDto } from './dto/single-task-response.dto';
import { formatStatus } from './task.helper';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(queryDto: QueryTaskDto): Promise<ListTasksResponseDto> {
    const {
      page = DEFAULT_PAGE,
      limit = DEFAULT_PAGE_SIZE,
      assigneeId,
      priority,
      status,
    } = queryDto;

    const where: Prisma.TaskWhereInput = {
      ...(assigneeId && { assignee_id: assigneeId }),
      ...(priority && { priority: priority }),
      ...(status && { status: status }),
    };

    const skip = (page - 1) * limit;

    const [total, rawTasks] = await this.prisma.$transaction([
      this.prisma.task.count({ where }),
      this.prisma.task.findMany({
        where,
        orderBy: { position: 'asc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          priority: true,
          assignee: true,
          status: true,
          created_at: true,
          creator: true,
          due_date: true,
          description: true,
          position: true,
          updated_at: true,
        },
      }),
    ]);

    const mappedTasks: DetailTaskResponseDto[] = rawTasks.map((task) => {
      return {
        id: task.id,
        title: task.title,
        priority: task.priority,
        createdAt: task.created_at,
        status: formatStatus(task.status),
        assignee: task.assignee
          ? {
              id: task.assignee?.id,
              name: task.assignee?.name,
            }
          : null,
        creator: {
          id: task.creator.id,
          name: task.creator.name,
        },
        description: task.description,
        dueDate: task.due_date,
        position: task.position,
        updatedAt: task.updated_at,
      };
    });

    const totalPages = Math.ceil(mappedTasks.length / limit);
    return {
      data: mappedTasks,
      pagination: {
        limit: limit,
        page: page,
        total: total,
        totalPages: totalPages,
      },
    };
  }

  async findOne(id: string): Promise<SingleTaskResponseDto> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        priority: true,
        assignee: true,
        status: true,
        created_at: true,
      },
    });

    if (!task) throw new NotFoundException(`Task with id ${id} is not found`);

    return {
      data: {
        id: task.id,
        title: task.title,
        priority: task.priority,
        createdAt: task.created_at,
        status: formatStatus(task.status),
        assignee: task.assignee
          ? {
              id: task.assignee?.id,
              name: task.assignee?.name,
            }
          : null,
      },
    };
  }

  async create(dto: CreateTaskDto): Promise<SingleTaskResponseDto> {
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        priority: dto.priority,
        status: dto.status,
        assignee_id: dto.assigneeId ?? null,
        due_date: dto.dueDate ? new Date(dto.dueDate) : null,
        created_by: '1', //todo: add user id here
      },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return {
      data: {
        id: task.id,
        title: task.title,
        priority: task.priority,
        createdAt: task.created_at,
        status: formatStatus(task.status),
        assignee: task.assignee
          ? {
              id: task.assignee.id,
              name: task.assignee.name,
            }
          : null,
      },
    };
  }

  async update(id: string, dto: UpdateTaskDto): Promise<SingleTaskResponseDto> {
    try {
      const task = await this.prisma.task.update({
        where: { id },
        data: {
          ...(dto.title && { title: dto.title }),
          ...(dto.status && { status: dto.status }),
          ...(dto.priority && { priority: dto.priority }),
          ...(dto.assigneeId && { assignee_id: dto.assigneeId }),
          ...(dto.dueDate && { due_date: dto.dueDate }),
        },
        include: {
          assignee: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return {
        data: {
          id: task.id,
          title: task.title,
          priority: task.priority,
          createdAt: task.created_at,
          status: formatStatus(task.status),
          assignee: task.assignee
            ? {
                id: task.assignee.id,
                name: task.assignee.name,
              }
            : null,
        },
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Task with id ${id} is not found`);
      }
      throw error;
    }
  }

  async updateStatus(
    id: string,
    dto: UpdateStatusTaskDto,
  ): Promise<SingleTaskResponseDto> {
    try {
      const task = await this.prisma.task.update({
        where: { id },
        data: {
          position: dto.position,
          status: dto.status,
        },
        include: {
          assignee: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return {
        data: {
          id: task.id,
          title: task.title,
          priority: task.priority,
          createdAt: task.created_at,
          status: formatStatus(task.status),
          assignee: task.assignee
            ? {
                id: task.assignee.id,
                name: task.assignee.name,
              }
            : null,
        },
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Task with id ${id} is not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      throw error;
    }
  }
}
