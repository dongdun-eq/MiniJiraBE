class DetailErrorDto {
  field!: string;
  message!: string;
}

class ErrorWrapperDto {
  code!: string;
  message!: string;
  details!: DetailErrorDto[];
}

export class ErrorResponseDto {
  error!: ErrorWrapperDto;
}
