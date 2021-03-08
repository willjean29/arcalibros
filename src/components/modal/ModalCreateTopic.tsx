import { AxiosError } from "axios";
import React, { Dispatch, SetStateAction, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/images/resources.png";
import { RootStore } from "../../store/store";
import axios from "axios";
import { topicCreate } from "../../store/topic/topic.actions";
import {
  topicsUrl,
  TOPIC_NEW,
  TOPIC_CREATE_ERROR,
} from "../../store/topic/topic.types";
import imgClose from "../../assets/images/btn-close.png";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};
const ModalCreateTopic: React.FC<Props> = ({ setModalOpen }) => {
  const [errors, setErrors] = useState([] as string[]);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const classroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom?._id
  ) as string;
  const handleCreateTopic = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(topicsUrl.concat("create"), {
        classroom,
        comments: [] as string[],
        description,
        topic,
      });
      dispatch({
        type: TOPIC_NEW,
        payload: res.data.topic,
      });
      setModalOpen(false);
    } catch (error) {
      const errorAxios: AxiosError = error;
      setErrors(errorAxios.response?.data.message);
    }
  };
  return (
    <div className="modal-container">
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Crea un tema para su clase</h3>
        <form onSubmit={handleCreateTopic}>
          {errors[0] && <div className="alert-error">{errors[0]}</div>}
          <input
            type="text"
            placeholder="Nombre del tema"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <textarea
            placeholder="Descripcion de la clase"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <img src={img} alt="" />
          <button className="btn-modal" type="submit">
            CREAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateTopic;
