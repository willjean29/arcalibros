import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import { Course, UserType } from "../../utils/enums";
import Modal from "../modal/Modal";
import ModalAddEvaluation from "../modal/ModalAddEvaluation";
import ModalAddHomework from "../modal/ModalAddHomework";

const EvaluationOptions = () => {
  const [modalAddEvaluation, setModalAddEvaluation] = useState(false);
  const [modalAddHomework, setModalAddHomework] = useState(false);
  const userType = useSelector(
    (state: RootStore) => state.user.user?.type as number
  );
  return (
    <div className="evaluation-form-container">
      <form className="evaluation-form">
        <Modal modalOpen={modalAddEvaluation}>
          <ModalAddEvaluation setModalOpen={setModalAddEvaluation} />
        </Modal>
        <Modal modalOpen={modalAddHomework}>
          <ModalAddHomework setModalOpen={setModalAddHomework} />
        </Modal>
        <div className="evaluation-buttons force-top">
          {userType === UserType.TEACHER ? (
            <div
              className="btn-create-examn"
              onClick={() => setModalAddEvaluation(true)}
            >
              Crear examen
            </div>
          ) : null}

          {/* <div
            className="btn-create-examn"
            onClick={() => setModalAddHomework(true)}
          >
            Crear Tarea
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default EvaluationOptions;
