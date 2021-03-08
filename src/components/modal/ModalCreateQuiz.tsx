import React, { Dispatch, SetStateAction } from "react";
import img from "../../assets/images/resources.png";
import imgQuiz from "../../assets/images/test-image.png";
import imgClose from "../../assets/images/btn-close.png";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalCreateQuiz: React.FC<Props> = ({ setModalOpen }) => {
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />

      <div className="card-modal-general modal-align-left">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <div className="header-modal">
          <img src={imgQuiz} alt="" />
          <h3 className="welcometo">Crear evaluación</h3>
        </div>
        {/* <h6 className="modal-description">
          Para continuar porfavor complete su perfil
        </h6> */}
        <form>
          <label htmlFor="">Nombre de la evaluación</label>
          <input type="text" placeholder="Nombre de la evaluación" />

          <label htmlFor="">Elegir tema relevante</label>
          <div className="tags-container">
            <div className="tag">Literatura</div>
            <div className="tag">Computación</div>
            <div className="tag">Arte</div>
            <div className="tag">Comunicación</div>
            <div className="tag">Personal social</div>
          </div>

          <button className="btn-modal">Continuar</button>
        </form>
      </div>
    </>
  );
};

export default ModalCreateQuiz;
