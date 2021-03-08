import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Classroom } from "../../store/classroom/interfaces/classroom.interface";
import { RootStore } from "../../store/store";
import { UserType } from "../../utils/enums";
import Modal from "../modal/Modal";
import ModalCreateTopic from "../modal/ModalCreateTopic";
import TopicCard from "./TopicCard";

const Topic = () => {
  const [modalCreateLesson, setModalCreateLesson] = useState(false);
  const { type } = useSelector((state: RootStore) => state.user.user!);
  const classroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom
  ) as Classroom;
  //socket para todo el salon y devolver todo el salon
  return (
    <>
      <Modal modalOpen={modalCreateLesson}>
        <ModalCreateTopic setModalOpen={setModalCreateLesson} />
      </Modal>
      <div className="topic-page">
        <div className="topic-page-container container">
          <div className="topic-navbar">
            {type && type === UserType.TEACHER ? (
              <button
                onClick={() => setModalCreateLesson(true)}
                className="create-topic"
              >
                Crear
              </button>
            ) : null}

            {/* <button className="calendar">Calendario</button> */}
          </div>

          <div className="topics-container">
            {classroom.topics.length === 0 ? (
              <TopicCard />
            ) : (
              classroom.topics.map((topic, index) => (
                <TopicCard key={index} topic={topic} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic;
