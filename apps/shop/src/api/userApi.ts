import { get, put } from "./baseApi";
import type User from "../types/User";
import type { UserUpdateRequest } from "../types/User";
import type { ApiResponse } from "../types/Response";
import type { PasswordChangeRequest } from "ks-react-admin/src/interfaces/User";

const userApi = {
  getMe: (): Promise<ApiResponse<User>> => get("users/me", true),
  updateMe: (data: UserUpdateRequest): Promise<ApiResponse<User>> =>
    put("users/me", data),
  changePassword: (data: PasswordChangeRequest) =>
    put("users/me/password", data),
};

export const { getMe, updateMe, changePassword } = userApi;
