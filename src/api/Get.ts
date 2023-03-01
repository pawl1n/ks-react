import { token } from "../stores/tokenStore";

export default (url: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
