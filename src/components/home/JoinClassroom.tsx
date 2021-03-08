import React, { Dispatch, SetStateAction } from "react";

import imgCreateRoom from "../../assets/images/createClass.png";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const JoinClasssroom:React.FC<Props> = ({setModalOpen}) => {
  return (
    <div className="card-create-room">
      <div className="image">
        <img src={imgCreateRoom} alt="" />
      </div>
      <div className="info-create-room-card">
        <div>
          <h2>Unirse a una sala</h2>
          <p>Unirse a un aula con el código del curso que te brinden.</p>
        </div>
        <button onClick={() => setModalOpen(true)}>Unirse a una sala</button>
      </div>
    </div>
  );
};

export default JoinClasssroom;
