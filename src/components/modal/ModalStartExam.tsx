import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeExamClassroomDate,
  changeExamClassroomState,
  startExamClassroom,
} from "../../store/exam/exam.actions";
import imgClose from "../../assets/images/btn-close.png";
import { RootStore } from "../../store/store";
import moment from "moment";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  examClassroomId: string;
};

const ModalStartExam: React.FC<Props> = ({ setModalOpen, examClassroomId }) => {
  const dispatch = useDispatch();
  const [selectedMinutes, setSelectedMinutes] = useState("");
  const serverHour = useSelector((state: RootStore) => state.ui.clock);
  const handleStartExam = (e: FormEvent) => {
    e.preventDefault();

    const startDate = moment(serverHour, "MMMM Do YYYY, h:mm:ss a").format(
      "MMMM Do YYYY, h:mm:ss a"
    );
    const finishDate = moment(startDate, "MMMM Do YYYY, h:mm:ss a")
      .add(parseInt(selectedMinutes), "minutes")
      .format("MMMM Do YYYY, h:mm:ss a");

    const startExamDto = {
      startDate,
      finishDate,
    };
    dispatch(startExamClassroom(examClassroomId, startExamDto));
    dispatch(changeExamClassroomState(examClassroomId, true));
    dispatch(changeExamClassroomDate(examClassroomId, startExamDto));
    setModalOpen(false);
  };
  const handleChangeMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!isNaN(parseInt(e.target.value))) {
      setSelectedMinutes(e.target.value);
    }
  };
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Comenzar el examen</h3>
        <p>¿Estás segur@ que deseas comenzar el examen?</p>
        <h4 className="subTitle">Duración:</h4>
        <div className="duration-time">
          <button
            className={selectedMinutes === "30" ? "selected" : undefined}
            onClick={(e) => setSelectedMinutes("30")}
          >
            30 min
          </button>
          <button
            className={selectedMinutes === "45" ? "selected" : undefined}
            onClick={(e) => setSelectedMinutes("45")}
          >
            45 min
          </button>
          <button
            className={selectedMinutes === "60" ? "selected" : undefined}
            onClick={(e) => setSelectedMinutes("60")}
          >
            1 h
          </button>
          <button
            className={selectedMinutes === "120" ? "selected" : undefined}
            onClick={(e) => setSelectedMinutes("120")}
          >
            2 h
          </button>
          <div className="input-minutes">
            <input
              type="number"
              min="30"
              max="300"
              placeholder="120"
              onChange={handleChangeMinutes}
            />
            <span>min.</span>
          </div>
        </div>
        <form onSubmit={handleStartExam}>
          <div className="deleteModalOptions">
            <button className="btn-modal" type="submit">
              Comenzar
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

export default ModalStartExam;
