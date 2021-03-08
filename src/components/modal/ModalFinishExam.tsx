import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import imgClose from "../../assets/images/btn-close.png";
import {
  changeExamClassroomState,
  finishExamClassroom,
} from "../../store/exam/exam.actions";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  examClassroomId: string;
};

const ModalFinishExam: React.FC<Props> = ({
  setModalOpen,
  examClassroomId,
}) => {
  const dispatch = useDispatch();
  const handleFinishExam = (e: FormEvent) => {
    e.preventDefault();
    dispatch(finishExamClassroom(examClassroomId));
    dispatch(changeExamClassroomState(examClassroomId, false));
    setModalOpen(false);
  };
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Finalizar el examen</h3>
        <p>¿Estás segur@ que deseas finalizar el examen?</p>
        <form onSubmit={handleFinishExam}>
          <div className="deleteModalOptions">
            <button className="btn-modal" type="submit">
              Finalizar
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

export default ModalFinishExam;
