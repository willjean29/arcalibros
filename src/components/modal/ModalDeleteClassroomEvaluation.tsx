import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import imgClose from "../../assets/images/btn-close.png";
import { deleteExamClassroom } from "../../store/exam/exam.actions";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  examClassroomId: string;
};

const ModalDeleteClassroomEvaluation: React.FC<Props> = ({
  setModalOpen,
  examClassroomId,
}) => {
  const dispatch = useDispatch();
  const handleDeleteExamClassroom = (e: any) => {
    e.preventDefault();
    dispatch(deleteExamClassroom(examClassroomId));
    setModalOpen(false);
  };
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Eliminar Evaluación</h3>
        <p>
          Al eliminar esta evaluación perderas todas las notas registradas en la
          plataforma.
        </p>
        <p className="mt-5">
          ¿Estás seguro que deseas eliminar esta evaluación?
        </p>
        <form onSubmit={handleDeleteExamClassroom}>
          <div className="deleteModalOptions">
            <button className="btn-modal" type="submit">
              Eliminar
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

export default ModalDeleteClassroomEvaluation;
