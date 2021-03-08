import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import Modal from "../modal/Modal";
import ModalConfirmChangePassword from "../modal/ModalConfirmChangePassword";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [modaConfirmation, setModaConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [changePasswordDto, setChangePasswordDto] = useState<any>({});
  const userId = useSelector(
    (state: RootStore) => state.user.user?._id as string
  );
  const handleChangePassword = (e: any) => {
    e.preventDefault();
    if (newPassword === newPasswordConfirm) {
      setChangePasswordDto({
        userId,
        oldPassword,
        newPassword,
      });
      setError("");
      setModaConfirmation(true);
    } else {
      setError("Las contraseñas no coinciden");
    }
  };

  return (
    <div className="settings-card">
      <Modal modalOpen={modaConfirmation}>
        <ModalConfirmChangePassword
          setModalOpen={setModaConfirmation}
          changePasswordDto={changePasswordDto}
        />
      </Modal>
      <h4>Cambie su contraseña</h4>
      <p>Cambie su contraseña periódicamente para mayor seguridad</p>
      {error && <p>{error}</p>}
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Contraseña actual"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña nueva"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña nueva"
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
        />
        <button type="submit" className="btn-change-info">
          Cambiar
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
