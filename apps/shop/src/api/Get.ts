import { getToken, setToken } from "../stores/tokenStore";
import type { ApiEntityArrayResponse, Entity } from "../types/Response";

const baseUrl = "http://localhost:8080/api";
const get = (path: string, authorize: boolean = false) => {
  return fetch(
    `${baseUrl}/${path}`,
    authorize
      ? {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      : {}
  )
    .then((data) => {
      if (data.status === 401) {
        setToken("");
        window.location.href = "/login";
      }

      if (data.ok) {
        return data.json();
      } else {
        throw new Error("Failed to fetch data");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export function getAll<T extends Entity>(
  path: string,
  authorize: boolean = false
): Promise<ApiEntityArrayResponse<T>> {
  return get(path, authorize);
}

export function getOne<T extends Entity>(
  path: string,
  id: number,
  authorize: boolean = false
): Promise<T> {
  return get(`${path}/${id}`, authorize);
}

export default get;
