export interface ApiResponse<T> {
  data: T | undefined;
  error: any;
  status: number;
}
