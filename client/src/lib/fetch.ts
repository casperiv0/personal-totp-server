import { parse } from "cookie";
import axios, { AxiosRequestConfig } from "axios";

const API_URL = "http://localhost:3030/api/v1";

export async function handleRequest(
  path: string,
  cookie: string | null,
  options?: Omit<AxiosRequestConfig, "url">,
) {
  const parsedCookie = parse(cookie ?? "")?.["personal-totp-session"];

  return axios({
    url: `${API_URL}${path}`,
    withCredentials: true,
    headers: {
      Session: parsedCookie,
      "Content-Type": "application/json",
    },
    ...options,
  });
}
