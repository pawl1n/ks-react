import type { ApiResponseEntity } from "shared/types/response";

export interface User extends ApiResponseEntity {
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  role: (typeof possibleRoles)[number];
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

export const possibleRoles = ["ADMIN", "USER"] as const;

export type UserUpdateRequest = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};
