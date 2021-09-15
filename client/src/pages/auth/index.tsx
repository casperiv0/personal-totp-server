import * as React from "react";
import { authenticate } from "lib/auth";
import auth from "styles/auth.module.scss";
import form from "styles/form.module.scss";
import { useRouter } from "next/dist/client/router";

export default function Auth() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = await authenticate(username, password);

    if (data) {
      router.push("/");
    }
  }

  return (
    <div className={auth.authContainer}>
      <form onSubmit={onSubmit} className={auth.authForm}>
        <div className={form.group}>
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            className={form.input}
          />
        </div>
        <div className={form.group}>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className={form.input}
          />
        </div>

        <button className={`btn ${form.submit}`}>Authenticate</button>
      </form>
    </div>
  );
}
