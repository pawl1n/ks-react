export type AuthResponse = {
  token: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type TokenPayloadObject = {
  token: string | null;
};
