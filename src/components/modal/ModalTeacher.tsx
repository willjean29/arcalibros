import React, { Dispatch, SetStateAction, useState } from "react";
import img from "../../assets/images/resources.png";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalTeacher: React.FC<Props> = ({ setModalOpen }) => {
  const [nombreColegio, setNombreColegio] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [distritoColegio, setDistritoColegio] = useState("");
  // const [modalIsOpen, setModalIsOpen] = useState(true)

  return (
    <>
      <div className="modverlay" />
      <div className="card-modal-general">
        <h3 className="welcometo">Bienvenido a Arca de Papel </h3>
        <h6 className="modal-description">
          Para continuar porfavor complete su perfil
        </h6>
        {/* <form onSubmit={e => procesarRegistroFinal(e)}> */}
        <form>
          <input
            type="text"
            placeholder="Nombre del colegio"
            value={nombreColegio}
            onChange={(e) => setNombreColegio(e.target.value)}
          />
          <input
            type="text"
            placeholder="Distrito del colegio"
            value={distritoColegio}
            onChange={(e) => setDistritoColegio(e.target.value)}
          />
          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <input
            type="text"
            placeholder="Telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <img src={img} alt="" />
          <button className="btn-modal" type="submit">
            Continuar
          </button>
        </form>
      </div>
    </>
  );
};

export default ModalTeacher;
