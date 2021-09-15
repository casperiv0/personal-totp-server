import { Account } from "types/Account";
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

export async function addAccount(secret: string, name: string): Promise<Account | null> {
  try {
    const res = await handleRequest("/accounts", null, {
      method: "POST",
      data: { secret, name },
    });

    return res.data.account;
  } catch {
    return null;
  }
}
