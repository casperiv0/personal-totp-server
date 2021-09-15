import * as React from "react";
import { generate6DigitCode } from "lib/otp";
import { Account } from "types/Account";
import styles from "./item.module.scss";

interface Props {
  account: Account;
}

const seconds = () => new Date().getUTCSeconds() % 30;
const calculateWidth = (s: number) => {
  const v = (s / 30) * 100;

  if (v <= 0) {
    return 0.5;
  }

  return v;
};

export const AccountItem = ({ account }: Props) => {
  const [code, setCode] = React.useState(generate6DigitCode(account.secret));
  const [, setTime] = React.useState(seconds());

  const [color, setColor] = React.useState("green");
  const [width, setWidth] = React.useState(0.5);

  const refreshState = React.useCallback(() => {
    const time = seconds();

    setTime((prevTime) => {
      if (30 - prevTime <= 5) {
        setColor("red");
      } else {
        setColor("green");
      }

      setWidth(calculateWidth(time));

      if (prevTime > time) {
        setCode(generate6DigitCode(account.secret));
      }
      return time;
    });
  }, [account]);

  React.useEffect(() => {
    refreshState();

    const interval = setInterval(() => {
      refreshState();
    });

    return () => clearInterval(interval);
  }, [refreshState]);

  return (
    <div className={styles.accountItem}>
      <h2>{account.name || "GitHub"}</h2>
      <p>{code}</p>

      <div
        className={styles.progressBar}
        style={{
          width: `${width}%`,
          background: color,
        }}
      />
    </div>
  );
};
