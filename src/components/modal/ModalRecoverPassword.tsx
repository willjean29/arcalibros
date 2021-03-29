import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import imgClose from "../../assets/images/btn-close.png";
import axios from "axios";
import { toast } from "react-toastify";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalRecoverPassword: React.FC<Props> = ({ setModalOpen }) => {
  const recoverUrl = "http://localhost:4000/users/password/";
  const [recoverEmail, setRecoverEmail] = useState("");
  const handleRecoverPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.get(recoverUrl.concat(recoverEmail));
      setModalOpen(false);
      if (res.data.userPassword) {
        toast.success("Contraseña enviada al email");
      }
    } catch (error) {
      setModalOpen(false);
      toast.error("Email no existe");
    }
  };
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Recuperar contraseña</h3>
        <p>Coloca el correo electrónico con el que te registraste</p>
        <p>Este es un mensaje de error</p>
        <form onSubmit={handleRecoverPassword}>
          <input
            type="email"
            placeholder="nombre@ejemplo.com"
            value={recoverEmail}
            onChange={(e) => setRecoverEmail(e.target.value)}
          />

          <button className="btn-modal" type="submit">
            Recuperar
          </button>
        </form>
      </div>
    </>
  );
};

export default ModalRecoverPassword;
