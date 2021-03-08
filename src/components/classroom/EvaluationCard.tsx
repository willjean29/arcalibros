import React, { useState } from "react";
import { Link } from "react-router-dom";

// import imgVerticalMenu from "../../assets/icons/vertical-menu.png";
import imgTrash from "../../assets/icons/trash.png";
import imgEye from "../../assets/icons/eye.png";
import { ExamClassroom } from "../../store/exam/interfaces/exam-classroom.interface";
import Modal from "../modal/Modal";
import ModalDeleteTopic from "../modal/ModalDeleteTopic";
import moment from "moment";
import ModalStartExam from "../modal/ModalStartExam";
import ModalFinishExam from "../modal/ModalFinishExam";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import { UserType } from "../../utils/enums";
import ModalDeleteClassroomEvaluation from "../modal/ModalDeleteClassroomEvaluation";
interface IProps {
  examClassroom: ExamClassroom;
}
const EvaluationCard: React.FC<IProps> = ({ examClassroom }) => {
  const [
    modalDeleteClassroomEvaluation,
    setModalDeleteClassroomEvaluation,
  ] = useState(false);
  const [modalDeleteTopic, setModalDeleteTopic] = useState(false);
  const [modalStartExam, setModalStartExam] = useState(false);
  const [modalFinishExam, setModalFinishExam] = useState(false);
  const userType = useSelector(
    (state: RootStore) => state.user.user?.type as number
  );
  return (
    <div className="topic-card evaluation">
      <Modal modalOpen={modalStartExam}>
        <ModalStartExam
          setModalOpen={setModalStartExam}
          examClassroomId={examClassroom._id as string}
        />
      </Modal>
      <Modal modalOpen={modalDeleteClassroomEvaluation}>
        <ModalDeleteClassroomEvaluation
          setModalOpen={setModalDeleteClassroomEvaluation}
          examClassroomId={examClassroom._id as string}
        />
      </Modal>
      <Modal modalOpen={modalFinishExam}>
        <ModalFinishExam
          setModalOpen={setModalFinishExam}
          examClassroomId={examClassroom._id as string}
        />
      </Modal>

      <div className="topic-header">
        <div className="examn-preview">
          <h2>{examClassroom.name}</h2>
          <Link
            className="btn-preview"
            to={`/plataforma/examen/${examClassroom._id}`}
          >
            <img src={imgEye} alt="" />
          </Link>
        </div>
        {userType === UserType.TEACHER ? (
          <div
            className="btn-delete-evaluation"
            onClick={() => setModalDeleteClassroomEvaluation(true)}
          >
            <img src={imgTrash} alt="" />
          </div>
        ) : null}
      </div>
      <div className="topic-content">
        <p>{examClassroom.exam}</p>
        <p className="activeEvaluation">
          Estado: {examClassroom.active ? "En Ejecucion" : "Inactivo"}{" "}
          <span className={examClassroom.active ? "active" : ""}></span>
        </p>

        {examClassroom.startDate && (
          <p>Fecha Inicio: {examClassroom.startDate}</p>
        )}
        {examClassroom.finishDate !== "default" && (
          <p>Fecha Fin: {examClassroom.finishDate}</p>
        )}

        {examClassroom.active ? null : (
          <div className="viewEvaluationDetail">
            <Link
              to={`/plataforma/salon/evaluacion/${examClassroom._id as string}`}
            >
              Ver resultados
            </Link>
          </div>
        )}

        {userType === UserType.TEACHER ? (
          <div className="buttons">
            <button onClick={() => setModalStartExam(true)}>
              INICIAR EVALUACION
            </button>
            <button onClick={() => setModalFinishExam(true)}>
              TERMINAR EVALUACION
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EvaluationCard;
