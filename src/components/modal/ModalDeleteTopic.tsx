import React, { Dispatch, SetStateAction } from "react";
import imgClose from "../../assets/images/btn-close.png";
import axios from "axios";
import { topicsUrl } from "../../store/topic/topic.types";
import { RootStore } from "../../store/store";
import { Topic } from "../../store/topic/interfaces/topic.interface";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  topicId: string;
  topics: Topic[];
};

const ModalDeleteTopic: React.FC<Props> = ({
  setModalOpen,
  topicId,
  topics,
}) => {
  const handleDeleteTopic = async (e: any) => {
    e.preventDefault();
    // try {
    //   const res = await axios.delete(topicsUrl.concat(topicId));
    //   const newExams = exams.filter((exam) => exam._id !== topicId);
    //   if (res.data.exam) {
    //     dispatch({
    //       type: EXAM_DELETE,
    //       payload: newExams,
    //     });
    //     setModalOpen(false);
    //     toast.success("Examen borrado");
    //   }
    // } catch (error) {
    //   const errorAxios: AxiosError = error;
    //   console.log(errorAxios.message);
    //   toast.error("Error al borrar examen");
    // }
  };
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Eliminar tema</h3>
        <p>¿Estás seguro que deseas eliminar este tema?</p>
        <form onSubmit={handleDeleteTopic}>
          <div className="deleteModalOptions">
            <button className="btn-modal" type="submit">
              Borrar
            </button>
            <button
              className="btn-modal btn-cancel"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalDeleteTopic;
