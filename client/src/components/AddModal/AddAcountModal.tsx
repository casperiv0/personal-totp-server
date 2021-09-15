import { addAccount } from "lib/actions";
import * as React from "react";
import ReactModal from "react-modal";
import { useAccountStore } from "stores/accounts";
import form from "styles/form.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const styles: ReactModal.Styles = {
  content: {
    background: "#f5f5f5",
    width: "45rem",
    maxWidth: "95%",
    height: "420px",

    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  },
  overlay: {
    background: "rgba(0,0,0,0.7)",
  },
};

ReactModal.setAppElement("#__next");
export const AddAccountModal = ({ isOpen, onClose }: Props) => {
  const [secret, setSecret] = React.useState("");
  const [name, setName] = React.useState("");
  const store = useAccountStore();

  function reset() {
    setSecret("");
    setName("");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = await addAccount(secret, name);

    if (data) {
      reset();
      store.addAccount(data);
      onClose();
    }
  }

  return (
    <ReactModal style={styles} isOpen={isOpen} onRequestClose={onClose}>
      <h1>Add Account</h1>

      <form onSubmit={onSubmit} style={{ marginTop: "1em" }}>
        <div className={form.group}>
          <label htmlFor="service-name">Service name</label>
          <input
            autoFocus
            id="service-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={form.input}
            placeholder="GitHub"
          />
        </div>

        <div className={form.group}>
          <label htmlFor="secret-key">Secret key</label>
          <input
            id="secret-key"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className={form.input}
          />
        </div>

        <button type="submit" className={`btn ${form.submit}`}>
          Add Account
        </button>
      </form>
    </ReactModal>
  );
};
