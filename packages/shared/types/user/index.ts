import { ApiResponseEntity } from "shared/types/response";

export interface User extends ApiResponseEntity {
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  role: "ADMIN" | "USER";
  phoneNumber: string;
  _links: {
    self: {
      href: string;
    };
    "change-password": {
      href: string;
    };
  };
}

export type UserUpdateRequest = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};
