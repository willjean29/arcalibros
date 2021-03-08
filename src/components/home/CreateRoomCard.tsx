import React, { Dispatch, SetStateAction } from "react";

import imgCreateRoom from "../../assets/images/createClass.png";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const CreateRoomCard:React.FC<Props> = ({setModalOpen}) => {
  return (
    <div className="card-create-room">
      <div className="image">
        <img src={imgCreateRoom} alt="" />
      </div>
      <div className="info-create-room-card">
        <div>
          <h2>Crea una sala de estudios</h2>
          <p>Crea un aula del curso que enseñas y agrega temas para impartir a tus estudiantes.</p>
        </div>
        <button onClick={() => setModalOpen(true)}>Crear sala</button>
      </div>
    </div>
  );
};

export default CreateRoomCard;
