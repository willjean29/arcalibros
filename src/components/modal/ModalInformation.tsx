import React, { Dispatch, SetStateAction } from "react";
import imgClose from "../../assets/images/btn-close.png";
import imgLogo from "../../assets/images/logo.png";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalInformation: React.FC<Props> = ({ setModalOpen }) => {
  return (
    <>
      <div className="modverlay" />
      <div className="card-modal-general information">
      <img width="200px" style={{marginBottom: "25px"}} src={imgLogo} alt="" />
        {/* <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button> */}
        <h3 className="welcometo">Estimados profesores y alumnos:</h3>
        <p className="paragraph">
          A las personas que se registraron en la plataforma desde el día 28 de
          febrero hasta el 03 de marzo, les agradeceríamos volver a registrarse
          con los códigos proporcionados. Disculpen los inconvenientes pero
          estamos trabajando para ofrecerles un buen servicio para el beneficio
          de la educación de nuestros estudiantes.
        </p>
        <p className="p-center">
        En caso tenga alguna consulta, por favor envié un correo a:
        </p>
        <p className="p-center">
          <a href="mailto:soporteplataforma@arcadepapel.net">soporteplataforma@arcadepapel.net</a>
        </p>
        <form>
          <div className="deleteModalOptions">
            <button className="btn-modal" onClick={() => setModalOpen(false)}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalInformation;
