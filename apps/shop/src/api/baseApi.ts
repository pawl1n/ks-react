import {
  getAccessToken,
  getRefreshToken,
  setToken,
} from "../stores/tokenStore";
import type { ApiResponse } from "../types/Response";

const baseUrl = "http://localhost:8080/api";

const baseApi = {
  get: (
    path: string,
    authenticate: boolean = false,
    params?: URLSearchParams
  ) => {
    const query = () =>
      baseQuery(`${path}${params ? "?" + params : ""}`, authenticate);

    return query()
      .then((data) => refreshOn401(data, query))
      .then(processResponse);
  },
  put: (path: string, data: any) => {
    const query = () =>
      baseQuery(path, true, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

    return query()
      .then((res) => refreshOn401(res, query))
      .then(processResponse);
  },
  post: (path: string, data: any, authenticate = true) => {
    const query = () =>
      baseQuery(path, authenticate, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

    return query()
      .then((res) => refreshOn401(res, query))
      .then(processResponse);
  },
};

const baseQuery = (
  path: string,
  authenticate = false,
  params: RequestInit | undefined = undefined
) => {
  const url = path.startsWith("http") ? path : `${baseUrl}/${path}`;

  const init = authenticate
    ? {
        ...params,
        ...{
          headers: {
            ...params?.headers,
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      }
    : params;

  return fetch(url, init);
};

const processResponse = async (res: Response) => {
  return {
    data: String(res.status).startsWith("2") ? await res.json() : undefined,
    status: res.status,
    error: String(res.status).startsWith("4") ? await res.json() : undefined,
  } as ApiResponse<any>;
};

const refreshOn401 = async (data: Response, query: () => Promise<Response>) => {
  if (data.status === 401 && !window.location.href.endsWith("/login")) {
    if (!getRefreshToken()) {
      window.location.href = "/login";
      throw new Error("Необхідно авторизуватись");
    }
    const res = await baseQuery(`auth/refresh`, false, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: getRefreshToken(),
      }),
    });

    if (res.status !== 200) {
      window.location.href = "/login";
      throw new Error("Необхідно авторизуватись");
    }
    setToken(await res.json());

    return await query();
  }

  return data;
};

export const { get, put, post } = baseApi;
