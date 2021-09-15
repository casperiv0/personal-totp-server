import { Account } from "./Account";

export interface User {
  username: string;
  accounts: Account[];
}
