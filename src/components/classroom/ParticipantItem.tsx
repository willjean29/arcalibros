import React, { useState } from "react";
import { useSelector } from "react-redux";

import imgLocked from "../../assets/icons/locked.png";
import imgUnlocked from "../../assets/icons/icons8-padlock-50.png";
import { RootStore } from "../../store/store";
import { UserType } from "../../utils/enums";
import Modal from "../modal/Modal";
import ModalBanParticipant from "../modal/ModalBanStudent";
import ModalUnbanParticipant from "../modal/ModalUnbanStudent";

interface Props {
  id: string;
  imgUser: string;
  name: string;
  lastname: string;
  type: string;
  status: boolean;
  email: string;
  banned: boolean;
}

const ParticipantItem: React.FC<Props> = ({
  id,
  banned,
  imgUser,
  name,
  lastname,
  type,
  status,
  email,
}) => {
  const [modalBanParticipant, setModalBanParticipant] = useState(false);
  const [modalUnbanParticipant, setModalUnbanParticipant] = useState(false);
  const userType = useSelector(
    (state: RootStore) => state.user.user?.type as number
  );
  return (
    <div className={`user-list-card  ${banned ? "banned" : ""}`}>
      <Modal modalOpen={modalBanParticipant}>
        <ModalBanParticipant setModalOpen={setModalBanParticipant} id={id} />
      </Modal>
      <Modal modalOpen={modalUnbanParticipant}>
        <ModalUnbanParticipant
          setModalOpen={setModalUnbanParticipant}
          id={id}
        />
      </Modal>
      <div className="image">
        <img src={imgUser} alt=""></img>
      </div>
      <div className="userlist-info">
        <h4>
          {name} {lastname} 
        </h4>
        <h6>
          {type} {banned ? "suspendido" : null}
        </h6>

        <h6>{email}</h6>
      </div>
      
      <div className={`user-state ${type === 'Profesor' || userType === UserType.STUDENT ? 'col-expanded' : ''}`}>
        <span
          className={`state ${status === true ? "online" : "offline"}`}
        ></span>
      </div>

      {userType === UserType.TEACHER && type !== "Profesor" ? (
        <div
          className="user-delete"
          onClick={
            banned
              ? () => setModalUnbanParticipant(true)
              : () => setModalBanParticipant(true)
          }
        >
          <img src={banned ? imgUnlocked : imgLocked} alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default ParticipantItem;
