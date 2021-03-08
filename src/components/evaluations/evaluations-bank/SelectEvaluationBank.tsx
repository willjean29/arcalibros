import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../../store/store";
import { Course } from "../../../utils/enums";
interface IProps {
  setFilterCourse: React.Dispatch<React.SetStateAction<string>>;
  setFilterLevel: React.Dispatch<React.SetStateAction<string>>;
}
const SelectEvaluationBank: React.FC<IProps> = ({
  setFilterCourse,
  setFilterLevel,
}) => {
  const courses = useSelector(
    (state: RootStore) => state.classroom.classrooms
  ).map((classroom) => classroom.course);
  const onlyUnique = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
  };
  const filteredCourses = courses.filter(onlyUnique);
  const levels = useSelector((state: RootStore) => state.user.user?.levels);
  useEffect(() => {
    setFilterCourse(filteredCourses[0]);
  }, []);
  return (
    <div className="evaluation-form-container">
      <form className="evaluation-form">
        {/* <div className="form-input">
              <label htmlFor="">Nombre de la evaluación</label>
              <input className="input" type="text" placeholder="Ingresar nombre" />
            </div> */}

        <div className="form-input">
          <label htmlFor="">Curso</label>
          <select
            className="input"
            name="course"
            onChange={(e) => setFilterCourse(e.target.value)}
          >
            {filteredCourses &&
              filteredCourses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
          </select>
        </div>

        {/* <div className="form-input">
          <label htmlFor="">Nivel</label>
          <select
            className="input"
            name="level"
            onChange={(e) => setFilterLevel(e.target.value)}
          >
            {typeof levels === "string" ? (
              <option>{levels}</option>
            ) : (
              levels?.map((level, index) => (
                <option key={index}>{level}</option>
              ))
            )}
          </select>
        </div> */}

        {/* <div className="form-input small">
              <label htmlFor="">Grado</label>
              <input className="input" type="text" placeholder="Grado" />
            </div> */}
      </form>
    </div>
  );
};

export default SelectEvaluationBank;
