import * as React from "react";
import { GetServerSideProps } from "next";
import { useAuthStore } from "stores/auth";
import { User } from "types/User";
import { useRouter } from "next/dist/client/router";
import { getUser } from "lib/actions";
import styles from "styles/app.module.scss";
import { AccountItem } from "components/AccountItem/AccountItem";
import { AddAccountModal } from "components/AddModal/AddAcountModal";
import { useAccountStore } from "stores/accounts";

interface Props {
  user: User | null;
}

export default function Index({ user }: Props) {
  const [isOpen, setOpen] = React.useState(false);

  const setUser = useAuthStore((s) => s.setUser);
  const { accounts, setAccounts } = useAccountStore();
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      setUser(user);
      setAccounts(user.accounts);
      console.log(user);
    } else {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.appContainer}>
      <h1>Your Accounts</h1>

      {accounts.length <= 0 ? (
        <p>You do not have any accounts yet.</p>
      ) : (
        accounts.map((account) => <AccountItem key={account.secret} account={account} />)
      )}

      <button onClick={() => setOpen(true)}>OPen</button>
      <AddAccountModal isOpen={isOpen} onClose={() => setOpen(false)} />
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
