import { Prisma, Status } from '../../generated/prisma/client';
import {
  DetailTaskResponseDto,
  TaskResponseDto,
} from './dto/task-response.dto';

type TaskWithAssignee = Prisma.TaskGetPayload<{
  include: {
    assignee: {
      select: { id: true; name: true };
    };
  };
}>;

type TaskWithFullRelations = Prisma.TaskGetPayload<{
  include: {
    assignee: { select: { id: true; name: true } };
    creator: { select: { id: true; name: true } };
  };
}>;

export const formatStatus = (status: Status) => {
  return status.replace('_', '-');
};

export function mapToTaskResponse(task: TaskWithAssignee): TaskResponseDto {
  return {
    id: task.id,
    title: task.title,
    priority: task.priority,
    createdAt: task.created_at,
    status: formatStatus(task.status),
    assignee: task.assignee
      ? { id: task.assignee.id, name: task.assignee.name }
      : null,
  };
}

export function mapToDetailTaskResponse(
  task: TaskWithFullRelations,
): DetailTaskResponseDto {
  return {
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
    creator: {
      id: task.creator.id,
      name: task.creator.name,
    },
    description: task.description,
    dueDate: task.due_date,
    position: task.position,
    updatedAt: task.updated_at,
  };
}
