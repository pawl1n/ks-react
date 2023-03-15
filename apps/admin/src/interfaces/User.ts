import { ApiResponseEntity } from './apiResponse';

interface User extends ApiResponseEntity {
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  role: 'ADMIN' | 'USER';
  _links: {
    self: {
      href: string;
    };
    'change-password': {
      href: string;
    };
  };
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}

export default User;
