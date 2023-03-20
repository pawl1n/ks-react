import { persistentMap } from "@nanostores/persistent";

const token = persistentMap(
  "token",
  {
    accessToken: "",
    refreshToken: "",
  },
  {}
);

type TokenProps = {
  accessToken: string;
  refreshToken: string;
};

export const setToken = (value: TokenProps) => {
  token.set(value);
};

export const getAccessToken = () => token.get().accessToken;

export const getRefreshToken = () => token.get().refreshToken;
