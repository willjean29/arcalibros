import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Excercise } from "../../../store/excercise/interfaces/exercise.interface";
import { RootStore } from "../../../store/store";
import { Course } from "../../../utils/enums";

import ItemQuestionBank from "./ItemQuestionBank";

const SelectQuestionBank = () => {
  const courses = useSelector(
    (state: RootStore) => state.classroom.classrooms
  ).map((classroom) => classroom.course);
  const onlyUnique = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
  };
  const filteredCourses = courses.filter(onlyUnique);
  const excercises = useSelector(
    (state: RootStore) => state.excercise.excercises
  );
  const [course, setCourse] = useState<string | null>(filteredCourses[0]);
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
      <div className="question-bank-select-container">
        <label htmlFor="">Filtrar por curso</label>
        <select
          className="input"
          name="course"
          onChange={(e) => setCourse(e.target.value)}
        >
          {filteredCourses &&
            filteredCourses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
        </select>
      </div>

      {course && filteredExcercises
        ? filteredExcercises.map((excercise, index) => (
            <ItemQuestionBank key={index} excercise={excercise} index={index} />
          ))
        : excercises.map((excercise, index) => (
            <ItemQuestionBank key={index} excercise={excercise} index={index} />
          ))}
    </>
  );
};

export default SelectQuestionBank;
