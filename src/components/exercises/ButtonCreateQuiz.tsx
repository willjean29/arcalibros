import React, { Dispatch, SetStateAction } from "react";

import imgQuiz from '../../assets/images/education.png'

type ButtonCreateQuizProps = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ButtonCreateQuiz:React.FC<ButtonCreateQuizProps> = ({setModalOpen}) => {

  return (
    <div className="create-quiz-container">
      <div className="create-quiz-card" onClick={() => setModalOpen(true)}>
      <img src={imgQuiz} alt="" />
      <div className="create-quiz-detail">
        <h2 className="title">Crear pruebas y examenes</h2>
        <p className="description">
          Refuerza el aprendizaje elaborando preguntas de cuestionarios y
          encuestas que los estudiantes pueden completar a su propio ritmo.
        </p>
      </div>
    </div>
    </div>
  );
};

export default ButtonCreateQuiz;
