import React, { Dispatch, SetStateAction, useState } from "react";
import { Classroom } from "../../store/classroom/interfaces/classroom.interface";

import imgLocked from "../../assets/icons/locked.png";
import imgTrash from "../../assets/icons/trash.png";
import imgEdit from "../../assets/icons/icons8-edit-48.png";
import imgAddLink from "../../assets/icons/icons8-add-link-26.png";
import imgConference from "../../assets/icons/icons8-video-call-48.png";
import imgZoom from "../../assets/icons/icons8-zoom-48.png";
import imgMeet from "../../assets/icons/icons8-google-meet-48.png";

import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import { UserType } from "../../utils/enums";
import Modal from "../modal/Modal";
import ModalVideoconferenceURL from "../modal/ModalVideoconferenceURL";

interface IProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalOpenEdit: Dispatch<SetStateAction<boolean>>;
  classroom: Classroom;
}

const InfoClassroom: React.FC<IProps> = ({
  setModalOpen,
  setModalOpenEdit,
  classroom,
}) => {
  const userType = useSelector(
    (state: RootStore) => state.user.user?.type as number
  );

  const [modalVideoconference, setModalVideoconference] = useState(false);
  const [videoConferenceLink, setVideoConferenceLink] = useState("");

  const processLink = () => {
    let newLink;
    if (videoConferenceLink.includes("meet")){
      newLink = imgMeet;
    }else if (videoConferenceLink.includes("zoom")){
      newLink = imgZoom;
    }else{
      newLink= imgConference;
    }
    return newLink;
  }

  return (
    <div className="card-classroom">
      <Modal modalOpen={modalVideoconference}>
        <ModalVideoconferenceURL
          setModalOpen={setModalVideoconference}
          change={setVideoConferenceLink}
        />
      </Modal>
      <div className="info-classroom-card">
        <span className={classroom.color}></span>
        <h2 className="courseName">
          {classroom.course
            .concat(" - " + classroom.grade + "°")
            .concat(" " + classroom.section)}
        </h2>
        <h3>
          {`Profesor: ${classroom.teacher.firstName.concat(
            " " + classroom.teacher.lastName
          )}`}
        </h3>
        <h4 className="code">
          <img src={imgLocked} alt="" /> Código de la clase:{" "}
          <div className="classcode">{classroom._id}</div>
        </h4>
        <div className="videoconference-info">
        {userType === UserType.TEACHER && (
          <div className="button" onClick={() => setModalVideoconference(true)}>
            <img src={imgAddLink} alt="" />
          </div>)}
          {videoConferenceLink && (
            <a
              href={videoConferenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              <img src={processLink()} alt="" />
              <small>{videoConferenceLink} </small>
            </a>
          )}
        </div>
      </div>
      {userType === UserType.TEACHER ? (
        <>
          <button
            onClick={() => setModalOpenEdit(true)}
            className="floatButton left"
          >
            <img src={imgEdit} alt="" />
          </button>
          {/* <button onClick={() => setModalOpen(true)} className="floatButton">
          <img src={imgTrash} alt="" />
        </button> */}
        </>
      ) : null}
    </div>
  );
};

export default InfoClassroom;
