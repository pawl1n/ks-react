import { post } from "./baseApi";
import type { RegisterRequest } from "../types/User";
import type {
  AuthResponse,
  LoginRequest,
} from "ks-react-admin/src/interfaces/auth";
import type { ApiResponse } from "../types/Response";

const userApi = {
  login: (data: LoginRequest): Promise<ApiResponse<AuthResponse>> =>
    post("auth/login", data, false),
  register: (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> =>
    post("auth/register", data, false),
};

export const { login, register } = userApi;
