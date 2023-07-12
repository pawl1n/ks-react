export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}
