import { getToken, setToken } from "../stores/tokenStore";
import type { ApiEntityArrayResponse } from "../types/Response";

const get = (url: string): Promise<ApiEntityArrayResponse<any>> =>
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => {
    if (data.status === 401) {
      setToken("");
      window.location.href = "/login";
    }

    if (data.ok) {
      return data.json();
    } else {
      throw new Error("Failed to fetch data");
    }
  });

export default get;
