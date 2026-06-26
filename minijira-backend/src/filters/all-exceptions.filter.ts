import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '../../generated/prisma/client';

// 🔥 KHAI BÁO TRỰC TIẾP TẠI ĐÂY (Sửa lỗi: Cannot find module)
export interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  path: string;
  timestamp: string;
}

interface CustomValidationError {
  isValidationError: boolean;
  details: Array<{ field: string; message: string }>;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger('ExceptionFilter');

  private buildError(
    status: number,
    message: string | string[],
    path: string,
  ): ErrorResponse {
    return {
      statusCode: status,
      message,
      path,
      timestamp: new Date().toISOString(),
    };
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (this.isDbUnavailableError(exception)) {
      this.logError(request.method, request.url, 503, exception);
      return response
        .status(503)
        .json(this.buildError(503, 'Database unavailable', request.url));
    }

    const status: number =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const message = (() => {
      if (!exceptionResponse) return 'Internal server error';
      if (typeof exceptionResponse === 'string') return exceptionResponse;
      if (
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse &&
        exceptionResponse['message'] !== undefined
      ) {
        return exceptionResponse['message'] as string | string[];
      }
      return exception instanceof HttpException
        ? exception.message
        : 'Internal server error';
    })();

    this.logError(request.method, request.url, status, exception);

    if (
      status === 400 &&
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'isValidationError' in exceptionResponse
    ) {
      const validException = exceptionResponse as CustomValidationError;

      return response.status(status).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: validException.details,
        },
      });
    }
    response.status(status).json(this.buildError(status, message, request.url));
  }

  private isDbUnavailableError(exception: unknown): boolean {
    if (exception instanceof Prisma.PrismaClientInitializationError)
      return true;
    if (
      exception instanceof Error &&
      exception.constructor.name === 'DriverAdapterError'
    )
      return true;
    return false;
  }

  private logError(
    method: string,
    url: string,
    status: number,
    exception: unknown,
  ) {
    this.logger.error(
      `${method} ${url} - ${status}`,
      exception instanceof Error ? exception.stack : '',
    );
  }
}
