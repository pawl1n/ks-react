import { post } from "./baseApi";
import type {
  RegisterRequest,
  AuthResponse,
  LoginRequest,
} from "shared/types/auth";
import type { ApiResponse } from "../types/apiResponse";

const userApi = {
  login: (data: LoginRequest): Promise<ApiResponse<AuthResponse>> =>
    post("auth/login", data, false),
  register: (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> =>
    post("auth/register", data, false),
};

export const { login, register } = userApi;
