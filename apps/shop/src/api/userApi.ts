import { get, put } from "./baseApi";
import type { User, UserUpdateRequest } from "shared/types/user";
import type { ApiResponse } from "../types/apiResponse";
import type { PasswordChangeRequest } from "shared/types/auth";

const userApi = {
  getMe: (): Promise<ApiResponse<User>> => get("users/me", true),
  updateMe: (data: UserUpdateRequest): Promise<ApiResponse<User>> =>
    put("users/me", data),
  changePassword: (data: PasswordChangeRequest) =>
    put("users/me/password", data),
};

export const { getMe, updateMe, changePassword } = userApi;
