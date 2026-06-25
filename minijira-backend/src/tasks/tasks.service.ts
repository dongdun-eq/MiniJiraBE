import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusTaskDto } from './dto/update-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../share/share.constant';
import { Priority, Prisma } from '../../generated/prisma/client';
import {
  DetailTaskResponseDto,
  TaskResponseDto,
} from './dto/task-response.dto';
import { mapToDetailTaskResponse, mapToTaskResponse } from './task.helper';
import { ListResponseDto } from '../share/dto/list-response.dto';
import { SingleResponseDto } from '../share/dto/single-response.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    queryDto: QueryTaskDto,
  ): Promise<ListResponseDto<DetailTaskResponseDto>> {
    const {
      page = DEFAULT_PAGE,
      limit = DEFAULT_PAGE_SIZE,
      assigneeId,
      priority,
      status,
      search,
      minDueDate,
      maxDueDate,
    } = queryDto;

    const formatedSearch = search?.trim().toLowerCase();
    const priorities = (priority?.split(',') as Priority[]) ?? undefined;

    const where: Prisma.TaskWhereInput = {
      ...(assigneeId && { assignee_id: assigneeId }),
      ...(priorities && { priority: { in: priorities } }),
      ...(status && { status: status }),
      ...(search && { title: { contains: formatedSearch } }),
      ...((minDueDate !== undefined || maxDueDate !== undefined) && {
        due_date: {
          ...(minDueDate !== undefined && { gte: new Date(minDueDate) }),
          ...(maxDueDate !== undefined && { lte: new Date(maxDueDate) }),
        },
      }),
    };

    const skip = (page - 1) * limit;

    const [total, rawTasks] = await this.prisma.$transaction([
      this.prisma.task.count({ where }),
      this.prisma.task.findMany({
        where,
        orderBy: { position: 'desc' },
        skip,
        take: limit,
        include: {
          assignee: {
            select: { id: true, name: true },
          },
          creator: {
            select: { id: true, name: true },
          },
        },
      }),
    ]);

    const mappedTasks: DetailTaskResponseDto[] = rawTasks.map((task) => {
      return {
        ...mapToDetailTaskResponse(task),
      };
    });

    const totalPages = Math.ceil(total / limit);
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

  async findOne(id: string): Promise<SingleResponseDto<TaskResponseDto>> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        assignee: {
          select: { id: true, name: true },
        },
      },
    });

    if (!task) throw new NotFoundException(`Task with id ${id} is not found`);

    return {
      data: {
        ...mapToTaskResponse(task),
      },
    };
  }

  async create(
    dto: CreateTaskDto,
    createdBy: string,
  ): Promise<SingleResponseDto<TaskResponseDto>> {
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        priority: dto.priority,
        status: dto.status,
        assignee_id: dto.assigneeId ?? null,
        due_date: dto.dueDate ? new Date(dto.dueDate) : null,
        created_by: createdBy,
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
        ...mapToTaskResponse(task),
      },
    };
  }

  async update(
    id: string,
    dto: UpdateTaskDto,
  ): Promise<SingleResponseDto<TaskResponseDto>> {
    try {
      const task = await this.prisma.task.update({
        where: { id },
        data: {
          ...(dto.title && { title: dto.title }),
          ...(dto.status && { status: dto.status }),
          ...(dto.priority && { priority: dto.priority }),
          ...(dto.assigneeId !== undefined && { assignee_id: dto.assigneeId }),
          ...(dto.dueDate !== undefined && {
            due_date: dto.dueDate ? new Date(dto.dueDate) : null,
          }),
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
          ...mapToTaskResponse(task),
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
  ): Promise<SingleResponseDto<TaskResponseDto>> {
    console.log(dto);
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
          ...mapToTaskResponse(task),
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
        throw new NotFoundException(`Task with id ${id} not found`);
      }
      throw error;
    }
  }
}
