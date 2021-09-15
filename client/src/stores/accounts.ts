import create from "zustand";
import { Account } from "types/Account";

interface AccountsStore {
  accounts: Account[];

  addAccount: (account: Account) => void;
  setAccounts: (accounts: Account[]) => void;
}

export const useAccountStore = create<AccountsStore>((set, get) => ({
  accounts: [],

  addAccount: (account) => set({ accounts: [...get().accounts, account] }),
  setAccounts: (accounts) => set({ accounts }),
}));
