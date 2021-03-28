import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import ItemEvaluationClassroom from "../evaluations/evaluations-bank/ItemEvaluationClassroom";
import moment from "moment";
import axios from "axios";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { addExamsClassroom } from "../../store/exam/exam.actions";
import { Classroom } from "../../store/classroom/interfaces/classroom.interface";
import imgClose from "../../assets/images/btn-close.png";
import { toast } from "react-toastify";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalAddEvaluation: React.FC<Props> = ({ setModalOpen }) => {
  registerLocale("es", es);
  const dispatch = useDispatch();
  const exams = useSelector((state: RootStore) => state.exam.exams);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [typeSelection, setTypeSelection] = useState("Examen - ");
  const [startDate, setStartDate] = useState<any>(new Date());
  const classroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom?._id as string
  );
  const selectedClassroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom as Classroom
  );

  const [name, setName] = useState("");
  const handleSelection = (e: any, examId: string) => {
    e.preventDefault();
    setSelectedExam(examId);
  };

  const handleStartDate = (date: any) => {
    setStartDate(date);
  };

  const handleAddExam = async (e: any) => {
    e.preventDefault();
    if (selectedExam === null) {
      setError("Seleccione examen");
      return;
    }
    setError(null);

    const exam = exams.find((exam) => exam._id === selectedExam);
    if (exam !== undefined) {
      const examClassroomDto = {
        name: typeSelection.concat(name),
        exam: exam._id as string,
        classroom,
        active: false,
        startDate: moment(startDate).locale("es").format("MMMM Do YYYY"),
        finishDate: "default",
      };

      try {
        const res = await axios.post(
          "https://meet.arcavirtual.net/evaluations/exam/classroom",
          examClassroomDto
        );

        if (res.data.examClassroom) {
          dispatch(addExamsClassroom(res.data.examClassroom));
          setModalOpen(false);
          const toastOptions = {
            autoClose: 5000,
            closeOnClick: true,
          };
          toast.success("Evaluación agregada al salón de clases", toastOptions);
        }
      } catch (error) {
        const toastOptions = {
          autoClose: 5000,
          closeOnClick: true,
        };
        toast.error("Error al agregar examen", toastOptions);
      }
    }
  };
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general add-question-modal">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Agregar Evaluación</h3>
        <form onSubmit={handleAddExam}>
          {error && <p>{error}</p>}
          <div className="modalform">
            <div className="form-group date-picker">
              <DatePicker
                locale="es"
                selected={startDate}
                dateFormat={"dd/MM/yyyy"}
                onChange={(date) => handleStartDate(date)}
              />
            </div>
            <div className="form-group evaluation-name">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder={"Nombre del examen"}
              />
            </div>
            <div className="form-group checkbox">
              <label className="check">
                <input
                  type="checkbox"
                  name="type"
                  id=""
                  onChange={(e) => setTypeSelection("Examen - ")}
                  checked={typeSelection === "Examen - " ? true : false}
                />
                <span>Examen</span>
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  name="type"
                  id=""
                  onChange={(e) => setTypeSelection("Tarea - ")}
                  checked={typeSelection === "Tarea - " ? true : false}
                />
                <span>Tarea</span>
              </label>
            </div>
            <button className="btn-add-evaluation" type="submit">
              AGREGAR EVALUACIÓN
            </button>
          </div>
          <div className="show-question">
            {exams &&
              exams
                .filter((exam) => exam.course === selectedClassroom.course)
                .map((exam, index) => (
                  <ItemEvaluationClassroom
                    exam={exam}
                    key={index}
                    index={index}
                    onSelection={(e) => handleSelection(e, exam._id as string)}
                    selected={selectedExam === exam._id ? true : false}
                  />
                ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalAddEvaluation;
