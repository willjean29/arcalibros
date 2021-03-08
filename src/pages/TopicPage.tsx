import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useLocation } from "react-router-dom";
import { loadTopic, updateTopic } from "../store/topic/topic.actions";
import { RootStore } from "../store/store";

import Modal from "../components/modal/Modal";
import ModalCreateTopic from "../components/modal/ModalCreateTopic";
import InfoTopic from "../components/topic/InfoTopic";
import imgUser from "../assets/images/user.png";
import Loading from "../components/loading/Loading";

import { TopicComment } from "../store/topic/interfaces/topic-comment.interface";
import { SocketEvent, UserType } from "../utils/enums";
import PostFieldTopic from "../components/classroom/PostFieldTopic";
import { socket } from "../utils/sockets";
import { Topic } from "../store/topic/interfaces/topic.interface";
import PostCardTopic from "../components/classroom/PostCardTopic";
import ModalDeleteTopic from "../components/modal/ModalDeleteTopic";
interface IProps {
  id: string;
}
const TopicPage = ({ match }: RouteComponentProps<IProps>) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [modalDeleteTopic, setModalDeleteTopic] = useState(false);

  const topic = useSelector((state: RootStore) => state.topic.selectedTopic);
  const classroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom
  );
  useEffect(() => {
    dispatch(loadTopic(match.params.id));
  }, [location]);
  useEffect(() => {
    socket.topics.emit(SocketEvent.SuscribeToTopic, topic?._id as string);
  }, [topic]);

  useEffect(() => {
    socket.topics.on(SocketEvent.TopicFromServer, (topic: Topic) => {
      dispatch(updateTopic(topic));
    });
  }, []);

  return !topic ? (
    <Loading />
  ) : (
    <div className="topic-page">
      <Modal modalOpen={modalDeleteTopic}>
        {/* <ModalDeleteTopic
          setModalOpen={setModalDeleteTopic}
          topicId={topic._id as string}
        /> */}
      </Modal>
      <div className="topic-page-container global-container">
        <InfoTopic
          setModalOpen={setModalDeleteTopic}
          topic={topic}
          classroom={classroom!}
        />

        <PostFieldTopic imgUser={imgUser} topicId={topic._id!} />

        {topic.comments &&
          topic.comments
            .reverse()
            .map((comment, index) => (
              <PostCardTopic
                key={index}
                imgUser={imgUser}
                message={comment.comment}
                name={comment.name}
                course={classroom!.course}
                type={comment.type === UserType.TEACHER ? "Profesor" : "Alumno"}
                date={comment.date}
                profileImg={comment.profileImg}
                file={comment.file}
                comment={comment}
                topicId={topic._id as string}
              />
            ))}
      </div>
    </div>
  );
};

export default TopicPage;
