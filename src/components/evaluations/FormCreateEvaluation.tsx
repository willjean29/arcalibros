import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Excercise } from "../../store/excercise/interfaces/exercise.interface";
import { RootStore } from "../../store/store";
import axios, { AxiosError } from "axios";
import Modal from "../modal/Modal";
import ModalAddQuestionExam from "../modal/ModalAddQuestionExam";
import { toast, ToastContainer } from "react-toastify";
import { examURL } from "../../store/exam/exam.types";
import { examResetExcercises } from "../../store/exam/exam.actions";
interface IProps {
  examExcercises: Excercise[];
}
const FormCreateEvaluation: React.FC<IProps> = ({ examExcercises }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const teacher = useSelector((state: RootStore) => state.user.user?._id);
  const courses = useSelector(
    (state: RootStore) => state.classroom.classrooms
  ).map((classroom) => classroom.course);
  const levels = useSelector(
    (state: RootStore) => state.user.user?.levels as string[]
  );
  const onlyUnique = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
  };
  const filteredCourses = courses.filter(onlyUnique);
  const [course, setCourse] = useState(filteredCourses[0]);
  const [level, setLevel] = useState(levels[0]);
  const [modalAddQuestion, setModalAddQuestion] = useState(false);
  const resetFields = () => {
    setCourse(filteredCourses[0]);
    setName("");
    setLevel(levels[0]);
    setGrade("");
    dispatch(examResetExcercises());
  };
  const handleCreateExam = async (e: FormEvent) => {
    e.preventDefault();
    const excercises = examExcercises.map((excercise) => excercise._id);
    const examDto = {
      name,
      course,
      level,
      teacher,
      grade,
      excercises,
    };
    if (excercises.length === 0) {
      toast.error("Por favor agregue un ejercicio");
      return;
    }
    try {
      const res = await axios.post(examURL.concat("create"), examDto);
      if (res.data.exam) {
        toast.info("Examen creado con éxito");
        resetFields();
      }
    } catch (error) {
      const errorAxios: AxiosError = error;
      console.log(errorAxios.message);
      toast.error("Error al agregar el examen");
    }
  };
  return (
    <div className="evaluation-form-container">
      {/* <ToastContainer limit={1} /> */}
      <Modal modalOpen={modalAddQuestion}>
        <ModalAddQuestionExam
          setModalOpen={setModalAddQuestion}
          course={course}
        />
      </Modal>
      <form className="evaluation-form" onSubmit={handleCreateExam}>
        <div className="form-input">
          <label htmlFor="">Nombre de la evaluación</label>
          <input
            className="input"
            type="text"
            placeholder="Ingresar nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-input">
          <label htmlFor="">Curso</label>
          <select
            className="input"
            name="course"
            onChange={(e) => setCourse(e.target.value)}
            value={course}
          >
            {filteredCourses &&
              filteredCourses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
          </select>
        </div>

        <div className="form-input">
          <label htmlFor="">Nivel</label>
          <select
            className="input"
            name="course"
            onChange={(e) => setLevel(e.target.value)}
            value={level}
          >
            {levels.map((level, index) => (
              <option key={index}>{level}</option>
            ))}
          </select>
        </div>

        <div className="form-input small">
          <label htmlFor="">Grado</label>
          <input
            className="input"
            type="text"
            placeholder="Grado"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>

        <div className="evaluation-buttons">
          <div
            className="btn-add-question"
            onClick={() => setModalAddQuestion(true)}
          >
            Agregar pregunta
          </div>
          <button className="btn-create-examn" type="submit">
            Crear examen
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCreateEvaluation;
