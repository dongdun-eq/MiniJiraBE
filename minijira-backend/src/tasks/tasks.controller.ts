import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusTaskDto } from './dto/update-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  SWAGGER_OP_CREATE_TASK,
  SWAGGER_OP_DELETE_TASK,
  SWAGGER_OP_FIND_ALL_TASKS,
  SWAGGER_OP_FIND_ONE_TASK,
  SWAGGER_OP_UPDATE_STATUS_TASK,
  SWAGGER_OP_UPDATE_TASK,
  SWAGGER_RESP_CREATE_TASK_SUCCESS,
  SWAGGER_RESP_DELETE_TASK_SUCCESS,
  SWAGGER_RESP_GET_TASK_SUCCESS,
  SWAGGER_RESP_GET_TASKS_SUCCESS,
  SWAGGER_RESP_NOT_FOUND,
  SWAGGER_RESP_UPDATE_TASK_SUCCESS,
  SWAGGER_RESP_VALIDATION_ERROR,
  SWAGGER_TASKS_TAG,
} from './tasks.constant';
import { QueryTaskDto } from './dto/query-task.dto';
import { JwtAuthGuard } from '../auth/jwt-guard.guard';
import type { AuthenticatedRequest } from '../auth/dto/auth-request.dto';

@ApiTags(SWAGGER_TASKS_TAG)
@Controller('api/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: SWAGGER_OP_FIND_ALL_TASKS })
  @ApiResponse({
    status: HttpStatus.OK,
    description: SWAGGER_RESP_GET_TASKS_SUCCESS,
  })
  findAll(@Query() queryDto: QueryTaskDto) {
    return this.tasksService.findAll(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: SWAGGER_OP_FIND_ONE_TASK })
  @ApiResponse({
    status: HttpStatus.OK,
    description: SWAGGER_RESP_GET_TASK_SUCCESS,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: SWAGGER_RESP_NOT_FOUND,
  })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: SWAGGER_OP_CREATE_TASK })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: SWAGGER_RESP_CREATE_TASK_SUCCESS,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: SWAGGER_RESP_VALIDATION_ERROR,
  })
  @UseGuards(JwtAuthGuard)
  create(@Request() req: AuthenticatedRequest, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto, req.user.userId);
  }

  @Put(':id')
  @ApiOperation({ summary: SWAGGER_OP_UPDATE_TASK })
  @ApiResponse({
    status: HttpStatus.OK,
    description: SWAGGER_RESP_UPDATE_TASK_SUCCESS,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: SWAGGER_RESP_NOT_FOUND,
  })
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(id, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: SWAGGER_OP_UPDATE_STATUS_TASK })
  @ApiResponse({
    status: HttpStatus.OK,
    description: SWAGGER_RESP_UPDATE_TASK_SUCCESS,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: SWAGGER_RESP_NOT_FOUND,
  })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusTaskDto) {
    console.log(dto);
    return this.tasksService.updateStatus(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: SWAGGER_OP_DELETE_TASK })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: SWAGGER_RESP_DELETE_TASK_SUCCESS,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: SWAGGER_RESP_NOT_FOUND,
  })
  async remove(@Param('id') id: string) {
    await this.tasksService.remove(id);
  }
}
