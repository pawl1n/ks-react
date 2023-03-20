import type { Entity } from "./Response";

export type RegisterRequest = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type UserUpdateRequest = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

interface User extends Entity {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export default User;
