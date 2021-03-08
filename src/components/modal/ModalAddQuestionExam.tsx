import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Excercise } from "../../store/excercise/interfaces/exercise.interface";
import { RootStore } from "../../store/store";
import imgClose from "../../assets/images/btn-close.png";
import ItemPreviewQuestionBank from "../evaluations/evaluations-bank/ItemPreviewQuestionBank";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  course: string | null;
};

const ModalAddQuestionExam: React.FC<Props> = ({ setModalOpen, course }) => {
  const excercises = useSelector(
    (state: RootStore) => state.excercise.excercises
  );

  const [filteredExcercises, setFilteredExcercises] = useState<
    Excercise[] | null
  >([] as Excercise[]);
  useEffect(() => {
    if (course) {
      filterArray();
    }
  }, [course]);

  const filterArray = () => {
    setFilteredExcercises(
      excercises.filter((excercise) => excercise.course === course)
    );
  };

  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general add-question-modal">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Agregar preguntas</h3>
        <form>
          <div className="show-question">
            {course !== null
              ? filteredExcercises!.map((excercise, index) => (
                  <ItemPreviewQuestionBank
                    key={index}
                    excercise={excercise}
                    index={index}
                  />
                ))
              : excercises.map((excercise, index) => (
                  <ItemPreviewQuestionBank
                    key={index}
                    excercise={excercise}
                    index={index}
                  />
                ))}
          </div>

          {/* <button className="btn-modal" type="submit">
            Crear evaluación
          </button> */}
        </form>
      </div>
    </>
  );
};

export default ModalAddQuestionExam;
