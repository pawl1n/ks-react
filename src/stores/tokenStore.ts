import { persistentAtom } from "@nanostores/persistent";

const token = persistentAtom<string>("token", "", {});

export const setToken = (value: string) => {
  token.set(value);
};

export const getToken = () => token.get();
