import React, { Dispatch, SetStateAction, MouseEvent } from "react";
import { Classroom } from "../../store/classroom/interfaces/classroom.interface";
import { Topic } from "../../store/topic/interfaces/topic.interface";

import imgBack from "../../assets/icons/back-to.png";
import imgTrash from "../../assets/icons/trash.png";
import { useHistory } from "react-router-dom";

interface IProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  topic: Topic;
  classroom: Classroom;
}

const InfoTopic: React.FC<IProps> = ({ setModalOpen, topic, classroom }) => {
  const history = useHistory();
  const handleBack = (e: MouseEvent) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <div className="card-classroom">
      <div className="info-classroom-card">
        <div className="back-color">
          <button onClick={handleBack}>
            <img src={imgBack} alt="" />
          </button>
          <span className={classroom.color}></span>
        </div>
        <h2 className="courseName">
          {classroom.course
            .concat(" - " + classroom.grade + "°")
            .concat(" " + classroom.section)}
        </h2>
        <h3>{topic.topic}</h3>
        <h4>
          <i className="fa fa-lock"></i> Código del tema: {topic._id}
        </h4>
      </div>
      {/* <button onClick={() => setModalOpen(true)} className="floatButton">
        <img src={imgTrash} alt=""/>
      </button> */}
    </div>
  );
};

export default InfoTopic;
