import React, { Dispatch, SetStateAction, useState } from "react";
import imgLogo from "../../assets/images/logo.png";
import axios from "axios";
import { USER_LOGOUT } from "../../store/user/user.types";
import { SocketEvent } from "../../utils/enums";
import { socket } from "../../utils/sockets";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import { useHistory } from "react-router-dom";
import imgClose from "../../assets/images/btn-close.png";
interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  changePasswordDto: {
    userId: string;
    oldPassword: string;
    newPassword: string;
  };
}

const ModalConfirmChangePassword: React.FC<Props> = ({
  setModalOpen,
  changePasswordDto,
}) => {
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(
    (state: RootStore) => state.user.user?._id as string
  );
  const handleConfimChangePassword = async (e: any) => {
    e.preventDefault();
    if (confirm.toLowerCase() === "confirmar") {
      try {
        const res = await axios.post(
          "http://localhost:4000/users/password",
          changePasswordDto
        );
        if (res.data.message) {
          setModalOpen(false);
          alert("Contraseña cambiada");
          dispatch({
            type: USER_LOGOUT,
          });
          localStorage.clear();
          socket.users.emit(SocketEvent.UserDisconnect, userId);
          history.push("/");
        }
      } catch (error) {
        setError("Error al cambiar la contraseña");
      }
    }
  };

  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <img width="200px" src={imgLogo} alt="" />
        <h3 className="welcometo">Cambiar contraseña</h3>
        <p>Digite confirmar para cambiar su contraseña</p>
        {error && <p>{error}</p>}
        <form onSubmit={handleConfimChangePassword}>
          <input
            type="text"
            placeholder="Digite confirmar"
            onChange={(e) => setConfirm(e.target.value)}
          />
          <div className="deleteModalOptions">
            <div
              className="btn-modal btn-cancel"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </div>
            <button className="btn-modal" type="submit">
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalConfirmChangePassword;
