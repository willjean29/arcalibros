import axios, { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Excercise } from "../../store/excercise/interfaces/exercise.interface";
import { homeworkResetExcercises } from "../../store/homework/homework.actions";
import { homeworkURL } from "../../store/homework/homework.types";
import { RootStore } from "../../store/store";
import { Course } from "../../utils/enums";
import Modal from "../modal/Modal";
import ModalAddQuestionHomework from "../modal/ModalAddQuestionHomework";
interface IProps {
  homeworkExcercises: Excercise[];
}
const FormCreateHomework: React.FC<IProps> = ({ homeworkExcercises }) => {
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
    dispatch(homeworkResetExcercises());
  };
  const handleCreateHomework = async (e: FormEvent) => {
    e.preventDefault();
    const excercises = homeworkExcercises.map((excercise) => excercise._id);
    const homeworkDto = {
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
      const res = await axios.post(homeworkURL.concat("create"), homeworkDto);
      if (res.data.homework) {
        toast.info("Tarea creado con éxito");
        resetFields();
      }
    } catch (error) {
      const errorAxios: AxiosError = error;
      console.log(errorAxios.message);
      toast.error("Error al crear la tarea");
    }
  };
  return (
    <div className="evaluation-form-container">
      {/* <ToastContainer limit={1} /> */}
      <Modal modalOpen={modalAddQuestion}>
        <ModalAddQuestionHomework
          setModalOpen={setModalAddQuestion}
          course={course}
        />
      </Modal>
      <form className="evaluation-form" onSubmit={handleCreateHomework}>
        <div className="form-input">
          <label htmlFor="">Nombre de la tarea</label>
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
            CREAR TAREA
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCreateHomework;
