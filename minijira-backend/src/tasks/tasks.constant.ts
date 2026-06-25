// ==================== VALIDATION MESSAGES ====================
export const TASK_TITLE_EMPTY_MESSAGE = 'task title cannot be empty';
export const TASK_TITLE_NOT_STRING_MESSAGE = 'task title must be string';

export const TASK_PRIORITY_INVALID_MESSAGE =
  'priority must be one of: low, medium, high, critical';
export const TASK_STATUS_INVALID_MESSAGE =
  'status must be one of: backlog, todo, in_progress, done';

export const TASK_ASSIGNEE_ID_NOT_STRING_MESSAGE = 'assigneeId must be string';
export const TASK_DUE_DATE_INVALID_MESSAGE =
  'dueDate must be a valid ISO 8601 date string (YYYY-MM-DD)';

export const TASK_POSITION_NOT_STRING_MESSAGE = 'position must be string';

export const QUERY_TASK_STATUS_INVALID_MESSAGE =
  'Status must be a valid enum value';
export const QUERY_TASK_PRIORITY_INVALID_MESSAGE = 'Priority must be string';
export const QUERY_TASK_ASSIGNEE_ID_NOT_STRING_MESSAGE =
  'AssigneeId must be a string';
export const QUERY_TASK_SEARCH_NOT_STRING_MESSAGE = 'Search must be a string';
export const QUERY_TASK_PAGE_NOT_INT_MESSAGE = 'Page must be an integer number';
export const QUERY_TASK_PAGE_MIN_MESSAGE = 'Page cannot be less than 1';
export const QUERY_TASK_LIMIT_NOT_INT_MESSAGE =
  'Limit must be an integer number';
export const QUERY_TASK_LIMIT_MIN_MESSAGE = 'Limit cannot be less than 1';

// ==================== SWAGGER DOCS CONSTANTS ====================
export const SWAGGER_TASK_TITLE_EXAMPLE = 'Implement login';
export const SWAGGER_TASK_TITLE_DESC = 'Tiêu đề của công việc cần làm';

export const SWAGGER_TASK_PRIORITY_EXAMPLE = 'high';
export const SWAGGER_TASK_PRIORITY_DESC = 'Mức độ ưu tiên của công việc';

export const SWAGGER_TASK_ASSIGNEE_EXAMPLE = 'user-123';
export const SWAGGER_TASK_ASSIGNEE_DESC =
  'ID của người được giao việc (User ID dạng UUID v7)';

export const SWAGGER_TASK_DUE_DATE_EXAMPLE = '2026-06-30';
export const SWAGGER_TASK_DUE_DATE_DESC = 'Hạn chót hoàn thành công việc';

export const SWAGGER_TASK_STATUS_EXAMPLE = 'todo';
export const SWAGGER_TASK_STATUS_DESC = 'Trạng thái hiện tại của công việc';

export const SWAGGER_TASK_POSITION_EXAMPLE = 'M';
export const SWAGGER_TASK_POSITION_DESC =
  'Vị trí thứ tự của task trong cột (dùng để kéo thả sắp xếp - Drag & Drop)';

export const SWAGGER_QUERY_TASK_STATUS_DESC = 'Filter by status (column)';
export const SWAGGER_QUERY_TASK_PRIORITY_DESC = 'Filter by priority';

export const SWAGGER_QUERY_TASK_ASSIGNEE_EXAMPLE = 'user-123';
export const SWAGGER_QUERY_TASK_ASSIGNEE_DESC = 'Filter by assignee id';

export const SWAGGER_QUERY_TASK_SEARCH_EXAMPLE = 'keyword';
export const SWAGGER_QUERY_TASK_SEARCH_DESC = 'Filter by keyword';

export const SWAGGER_QUERY_TASK_PAGE_EXAMPLE = 1;
export const SWAGGER_QUERY_TASK_PAGE_DESC = 'Page number, starting from 1';

export const SWAGGER_QUERY_TASK_LIMIT_DESC = 'Items per page';

// ==================== SWAGGER TASK RESPONSE CONSTANTS ====================
export const SWAGGER_RESPONSE_TASK_ID_EXAMPLE = 'task-456';
export const SWAGGER_RESPONSE_TASK_ID_DESC = 'ID của task (UUID v7)';

export const SWAGGER_RESPONSE_ASSIGNEE_ID_EXAMPLE = 'user-123';
export const SWAGGER_RESPONSE_ASSIGNEE_NAME_EXAMPLE = 'John Doe';
export const SWAGGER_RESPONSE_ASSIGNEE_DESC = 'Thông tin người được giao việc';

// ==================== SWAGGER CONTROLLER TAGS ====================
export const SWAGGER_TASKS_TAG = 'tasks';

// ==================== SWAGGER OPERATIONS ====================
export const SWAGGER_OP_FIND_ALL_TASKS =
  'Get all tasks, optionally filtered by status/priority/assignee';
export const SWAGGER_OP_FIND_ONE_TASK = 'Get a single task by id';
export const SWAGGER_OP_CREATE_TASK = 'Create a task';
export const SWAGGER_OP_UPDATE_TASK = 'Update a task';
export const SWAGGER_OP_UPDATE_STATUS_TASK = 'Update a task status';
export const SWAGGER_OP_MOVE_TASK =
  'Move a task to a different column/position (drag and drop)';
export const SWAGGER_OP_DELETE_TASK = 'Delete a task';

// ==================== SWAGGER RESPONSES ====================
export const SWAGGER_RESP_GET_TASKS_SUCCESS = 'Get tasks successfully';
export const SWAGGER_RESP_GET_TASK_SUCCESS = 'Get task successfully';
export const SWAGGER_RESP_CREATE_TASK_SUCCESS = 'Create task successfully';
export const SWAGGER_RESP_UPDATE_TASK_SUCCESS = 'Update task successfully';
export const SWAGGER_RESP_MOVE_TASK_SUCCESS = 'Move task successfully';
export const SWAGGER_RESP_DELETE_TASK_SUCCESS = 'Delete successfully';

export const SWAGGER_RESP_NOT_FOUND = 'Task not found';
export const SWAGGER_RESP_VALIDATION_ERROR = 'Validation error';

// ==================== SWAGGER TASK ADDITIONAL CONSTANTS ====================
export const SWAGGER_TASK_DESCRIPTION_EXAMPLE =
  'Chi tiết các bước thực hiện tính năng đăng nhập hệ thống...';
export const SWAGGER_TASK_DESCRIPTION_DESC =
  'Mô tả chi tiết nội dung công việc';

export const SWAGGER_RESPONSE_CREATOR_ID_EXAMPLE = 'user-456';
export const SWAGGER_RESPONSE_CREATOR_NAME_EXAMPLE = 'Jane Doe';
export const SWAGGER_RESPONSE_CREATOR_DESC = 'Thông tin người tạo công việc';

export const SWAGGER_TASK_UPDATED_AT_EXAMPLE = '2026-06-18T14:11:50.000Z';
export const SWAGGER_TASK_UPDATED_AT_DESC =
  'Thời gian cập nhật công việc lần cuối';
