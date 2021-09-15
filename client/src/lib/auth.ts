import { handleRequest } from "./fetch";

export async function getUser(cookie: string | null) {
  try {
    const res = await handleRequest("/auth/user", cookie, {
      method: "POST",
    });

    return res.data.user;
  } catch {
    return null;
  }
}

export async function authenticate(username: string, password: string) {
  try {
    const res = await handleRequest("/auth", null, {
      method: "POST",
      data: { username, password },
    });

    return res.data.userId;
  } catch {
    return null;
  }
}
