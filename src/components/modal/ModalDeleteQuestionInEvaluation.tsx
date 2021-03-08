import React, { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import imgClose from "../../assets/images/btn-close.png";
import axios, { AxiosError } from "axios";
import { examURL, EXAM_DELETE } from "../../store/exam/exam.types";
import { toast } from "react-toastify";
import { RootStore } from "../../store/store";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  deleteElement: string;
};

const ModalDeleteQuestionInEvaluation: React.FC<Props> = ({
  setModalOpen,
  deleteElement,
}) => {
  const dispatch = useDispatch();
  const exams = useSelector((state: RootStore) => state.exam.exams);
  const handleDeleteExam = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.delete(examURL.concat(deleteElement));
      const newExams = exams.filter((exam) => exam._id !== deleteElement);
      if (res.data.exam) {
        dispatch({
          type: EXAM_DELETE,
          payload: newExams,
        });
        setModalOpen(false);
        toast.success("Examen borrado");
      }
    } catch (error) {
      const errorAxios: AxiosError = error;
      console.log(errorAxios.message);
      toast.error("Error al borrar examen");
    }
  };
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Eliminar evaluación</h3>
        <p>¿Estás seguro que deseas eliminar la evaluación?</p>
        <form onSubmit={handleDeleteExam}>
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

export default ModalDeleteQuestionInEvaluation;
