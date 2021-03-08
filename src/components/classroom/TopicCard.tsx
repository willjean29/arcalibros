import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import imgVerticalMenu from "../../assets/icons/vertical-menu.png";
import imgTrash from "../../assets/icons/trash.png";
import { Classroom } from "../../store/classroom/interfaces/classroom.interface";
import { RootStore } from "../../store/store";
import { Topic } from "../../store/topic/interfaces/topic.interface";
import { UserType } from "../../utils/enums";
import Modal from "../modal/Modal";
import ModalDeleteTopic from "../modal/ModalDeleteTopic";
interface IProps {
  topic?: Topic;
}
const TopicCard: React.FC<IProps> = ({ topic }) => {
  const [modalDeleteTopic, setModalDeleteTopic] = useState(false);
  const userType = useSelector(
    (state: RootStore) => state.user.user?.type as number
  );
  const classroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom
  ) as Classroom;

  return (
    <div className="topic-card">
      <Modal modalOpen={modalDeleteTopic}>
        <ModalDeleteTopic
          setModalOpen={setModalDeleteTopic}
          topicId={topic?._id as string}
          topics={classroom.topics}
        />
      </Modal>
      <div className="topic-header">
        <h2>
          {topic ? (
            <Link to={`/plataforma/tema/${topic._id}`}>{topic.topic}</Link>
          ) : (
            "Aun no hay temas"
          )}
        </h2>
        {userType === UserType.TEACHER && classroom.topics.length !== 0 ? (
          <button onClick={() => setModalDeleteTopic(true)}>
            <img src={imgTrash} alt="" />
          </button>
        ) : null}
      </div>
      <div className="topic-content">
        <p>
          {topic
            ? topic.description
            : "Ingrese un nuevo tema con el boton crear"}
        </p>
      </div>
    </div>
  );
};

export default TopicCard;
