import React, { useState } from "react";
import Modal from "../../modal/Modal";
import ModalCreateEvaluation from "../../modal/ModalAddQuestionHomework";
import ItemQuestionBank from "../question-bank/ItemQuestionBank";
import SelectQuestionBank from "../question-bank/SelectQuestionBank";

const EditExcercise = () => {
  const [modalCreateEvaluation, setModalCreateEvaluation] = useState(false);
  return (
    <div className="question-bank">
      {/* <Modal modalOpen={modalCreateEvaluation}>
        <ModalCreateEvaluation setModalOpen={setModalCreateEvaluation} />
      </Modal> */}

      {/* <button onClick={() => setModalCreateEvaluation(true)}>
        Crear Evaluación
      </button> */}
      <SelectQuestionBank />
      {/* <ItemQuestionBank /> */}
    </div>
  );
};

export default EditExcercise;
