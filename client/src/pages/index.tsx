import * as React from "react";
import { GetServerSideProps } from "next";
import { useAuthStore } from "stores/auth";
import { User } from "types/User";
import { useRouter } from "next/dist/client/router";
import { getUser } from "lib/auth";
import styles from "styles/app.module.scss";
import { AccountItem } from "components/AccountItem/AccountItem";

interface Props {
  user: User | null;
}

export default function Index({ user }: Props) {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      setUser(user);
      console.log(user);
    } else {
      router.push("/auth");
    }
  }, [user, router]);

  return (
    <div className={styles.appContainer}>
      <h1>Your Accounts</h1>

      <AccountItem />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const user = await getUser(req.headers.cookie ?? null);

  return {
    props: {
      user,
    },
  };
};
