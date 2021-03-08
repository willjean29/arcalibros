import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { sendExamAnswer } from "../../store/exam/exam.actions";
import { AnswerExam } from "../../store/exam/interfaces/answer-exam.interface";
import imgClose from "../../assets/images/btn-close.png";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  answerExam: AnswerExam;
};

const ModalExameSent: React.FC<Props> = ({ setModalOpen, answerExam }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSendExam = (e: any) => {
    e.preventDefault();
    dispatch(sendExamAnswer(answerExam));
    setModalOpen(false);
    history.push("/plataforma");
  };
  return (
    <>
      <div className="modverlay" />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Enviar evaluación</h3>
        <p>¿Deseas enviar tu evaluación?</p>
        <form onSubmit={handleSendExam}>
          <div className="deleteModalOptions">
            <button className="btn-modal" type="submit">
              Si, enviar.
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

export default ModalExameSent;
