// ==================== VALIDATION MESSAGES ====================
export const EMAIL_INVALID_MESSAGE = 'invalid email';
export const PASSWORD_NOT_STRING_MESSAGE = 'password must be string';
export const PASSWORD_EMPTY_MESSAGE = 'password cannot be empty';
export const PASSWORD_MIN_LENGTH_MESSAGE =
  'password must has at least 8 characters';

export const NAME_NOT_STRING_MESSAGE = 'name must be string';
export const NAME_EMPTY_MESSAGE = 'name cannot be empty';
export const NAME_MIN_LENGTH_MESSAGE = 'name must has at least 6 characters';

export const IMAGE_URL_NOT_STRING = 'imageUrl must be string';

// ==================== SWAGGER DOCS CONSTANTS ====================
export const SWAGGER_EMAIL_EXAMPLE = 'fresher.dev@example.com';
export const SWAGGER_EMAIL_DESC =
  'Email dùng để đăng ký tài khoản (phải là duy nhất)';

export const SWAGGER_PASSWORD_EXAMPLE = 'SecurePass123!';
export const SWAGGER_PASSWORD_DESC =
  'Mật khẩu của tài khoản, yêu cầu tối thiểu 8 ký tự';

export const SWAGGER_NAME_EXAMPLE = 'Nguyen Van A';
export const SWAGGER_NAME_DESC =
  'Họ và tên đầy đủ của người dùng, yêu cầu tối thiểu 6 ký tự';

export const SWAGGER_AVATAR_EXAMPLE = 'https://example.com/avatar/user-01.png';
export const SWAGGER_AVATAR_DESC = 'Đường dẫn URL ảnh đại diện của người dùng';

// ==================== SWAGGER USER RESPONSE CONSTANTS ====================
export const SWAGGER_USER_ID_EXAMPLE = 'user-777-888';
export const SWAGGER_USER_ID_DESC = 'ID của người dùng (định dạng UUID v7)';

export const SWAGGER_USER_EMAIL_EXAMPLE = 'fresher.dev@example.com';
export const SWAGGER_USER_EMAIL_DESC = 'Email chính thức của người dùng';

export const SWAGGER_USER_NAME_EXAMPLE = 'Nguyen Van A';
export const SWAGGER_USER_NAME_DESC = 'Họ và tên đầy đủ hiển thị trên hệ thống';

export const SWAGGER_USER_AVATAR_EXAMPLE = 'https://example.com/avatar.png';
export const SWAGGER_USER_AVATAR_DESC =
  'Đường dẫn URL ảnh đại diện của người dùng';

export const SWAGGER_USER_CREATED_AT_EXAMPLE = '2026-06-16T07:00:00.000Z';
export const SWAGGER_USER_CREATED_AT_DESC =
  'Thời gian tài khoản được khởi tạo trên hệ thống';
