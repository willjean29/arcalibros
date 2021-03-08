import { spawn } from "child_process";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/images/resources.png";
import {
  classroomEdit,
  createClassroom,
} from "../../store/classroom/classroom.actions";
import {
  CLASSROOM_CLOSE_MODAL,
  CLASSROOM_CREATE_ERROR,
} from "../../store/classroom/classroom.types";
import { ClassroomDto } from "../../store/classroom/dtos/classroom.dto";
import { RootStore } from "../../store/store";
import { Color, Course, Level } from "../../utils/enums";
import imgClose from "../../assets/images/btn-close.png";
import { Classroom } from "../../store/classroom/interfaces/classroom.interface";
import { ClassroomEditDto } from "../../store/classroom/dtos/classroom-edit.dto";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalEditClassroom: React.FC<Props> = ({ setModalOpen }) => {
  const selectedClassroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom
  ) as Classroom;
  const createClassroomError = useSelector(
    (state: RootStore) => state.classroom.createClassroomError
  );
  const closeModal = useSelector(
    (state: RootStore) => state.classroom.closeClassroomModal
  );

  const levels = useSelector(
    (state: RootStore) => state.user.user?.levels as string[]
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [internError, setInternError] = useState("");
  const [color, setColor] = useState(selectedClassroom.color);
  const [grade, setGrade] = useState(selectedClassroom.grade);
  const [section, setSection] = useState(selectedClassroom.section);
  const [course, setCourse] = useState(selectedClassroom.course);
  const [level, setLevel] = useState(selectedClassroom.level);
  const [colorActive, setColorActive] = useState(selectedClassroom.color);
  useEffect(() => {
    dispatch({
      type: CLASSROOM_CREATE_ERROR,
      payload: undefined,
    });
    dispatch({
      type: CLASSROOM_CLOSE_MODAL,
      payload: false,
    });
  }, []);
  useEffect(() => {
    if (closeModal) {
      setModalOpen(false);
    }
  }, [closeModal]);
  const error = useSelector(
    (state: RootStore) => state.classroom.createClassroomError
  ) as string[];

  const handleColorSelection = (e: any) => {
    e.preventDefault();
    setColorActive(e.target.value);
    setColor(e.target.value);
  };

  const handleLevelSelection = (e: any) => {
    e.preventDefault();
    setLevel(e.target.value);
  };
  const handleCourseSelection = (e: any) => {
    e.preventDefault();
    setCourse(e.target.value);
  };

  const handleEditClassroom = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (level !== "Seleccione un nivel" && course !== "Seleccione un curso") {
      const classroom: ClassroomEditDto = {
        color,
        course,
        grade,
        level,
        section,
      };

      setInternError("");
      dispatch(classroomEdit(selectedClassroom._id as string, classroom));
      setModalOpen(false);
    } else {
      setInternError("Nivel o curso incorrecto");
    }

    // if(closeModal){
    //     setModalOpen(false);
    // }
  };

  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Edita el salón de clases</h3>
        {error && error.length >= 0 && (
          <div className="alert-error">{error[0]}</div>
        )}
        {internError && <div className="alert-error">{internError}</div>}
        <form onSubmit={handleEditClassroom}>
          <input
            type="text"
            placeholder="Grado"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Seccion"
            value={section}
            onChange={(e) => setSection(e.target.value.toUpperCase())}
          />
          <div className="content-select">
            <select onChange={handleLevelSelection}>
              <option>{level}</option>
              {levels.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <i></i>
          </div>
          <div className="content-select">
            <select onChange={handleCourseSelection}>
              <option>{course}</option>
              <option value={Course.COMPUTACION}>Computación</option>
              <option value={Course.ARTE}>Arte</option>
              <option value={Course.PERSONAL_SOCIAL}>Personal Social</option>
              <option value={Course.MATEMATICA}>Matemática</option>
              <option value={Course.COMUNICACION}>Comunicación</option>
              <option value={Course.CTA}>Ciencia y Tecnología</option>
              <option value={Course.INGLES}>Inglés</option>
              <option value={Course.COMPUTACION}>Computación</option>
              <option value={Course.INNOVACION}>
                Innovación y Emprendimiento
              </option>
            </select>
            <i></i>
          </div>
          <div className="color-chooser">
            <h3>Selecciona un color</h3>
            <div className={`colors active${colorActive}`}>
              <button
                className="btn-color violet"
                value={Color.VIOLET}
                onClick={(e) => handleColorSelection(e)}
              ></button>
              <button
                className="btn-color red"
                value={Color.RED}
                onClick={(e) => handleColorSelection(e)}
              ></button>
              <button
                className="btn-color blue"
                value={Color.BLUE}
                onClick={(e) => handleColorSelection(e)}
              ></button>
              <button
                className="btn-color yellow"
                value={Color.YELLOW}
                onClick={(e) => handleColorSelection(e)}
              ></button>
              <button
                className="btn-color green"
                value={Color.GREEN}
                onClick={(e) => handleColorSelection(e)}
              ></button>
              <button
                className="btn-color skyblue"
                value={Color.SKYBLUE}
                onClick={(e) => handleColorSelection(e)}
              ></button>
              <button
                className="btn-color pink"
                value={Color.PINK}
                onClick={(e) => handleColorSelection(e)}
              ></button>
            </div>
          </div>
          <img src={img} alt="" />
          <button className="btn-modal" type="submit">
            Guardar cambios
          </button>
        </form>
      </div>
    </>
  );
};

export default ModalEditClassroom;
