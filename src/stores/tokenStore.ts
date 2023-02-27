import { persistentAtom } from "@nanostores/persistent";

export const token = persistentAtom<string>("token", "", {});

export const setToken = (value: string) => {
  token.set(value);
};
