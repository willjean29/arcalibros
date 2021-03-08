import { AxiosError } from "axios";
import React, { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlternativeDto } from "../../../store/excercise/dtos/alternative.dto";
import { toast, ToastContainer } from "react-toastify";
import {
  excercisesUrl,
  EXCERCISE_CREATE,
  EXCERCISE_FLAG,
} from "../../../store/excercise/excercise.types";
import { RootStore } from "../../../store/store";
import { Course, ExcerciseType } from "../../../utils/enums";
import PhonePreviewDnD from "./PhonePreviewDnD";
import axios from "axios";

import imgDelete from "../../../assets/icons/delete-alt.png";

const FormEditorDnD = () => {
  const dispatch = useDispatch();
  const teacher = useSelector(
    (state: RootStore) => state.user.user?._id
  ) as string;
  const courses = useSelector(
    (state: RootStore) => state.classroom.classrooms
  ).map((classroom) => classroom.course);
  const onlyUnique = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
  };
  const filteredCourses = courses.filter(onlyUnique);
  const defaultAlternative: AlternativeDto = {
    text: "",
    dragGroup: 1,
  };

  const [alternatives, setAlternatives] = useState([
    defaultAlternative,
  ] as AlternativeDto[]);
  const [statement, setStatement] = useState("");
  const [dragGroups, setDragGroups] = useState(["", ""] as string[]);
  const [course, setCourse] = useState(filteredCourses[0]);
  const handleAlternativeTextChange = (e: any, alternativeIndex: number) => {
    setAlternatives(
      alternatives.map((alternative, index) =>
        index === alternativeIndex
          ? { ...alternative, text: e.target.value }
          : alternative
      )
    );
  };

  const handleGroupNameChange = (e: any, alternativeIndex: number) => {
    setDragGroups(
      dragGroups.map((dragGroup, index) =>
        index === alternativeIndex ? e.target.value : dragGroup
      )
    );
  };
  const handleAlternativeGroupChange = (e: any, alternativeIndex: number) => {
    setAlternatives(
      alternatives.map((alternative, index) =>
        index === alternativeIndex
          ? { ...alternative, dragGroup: parseInt(e.target.value) }
          : alternative
      )
    );
  };
  const handleAddAlternative = (e: MouseEvent) => {
    e.preventDefault();
    setAlternatives([...alternatives, defaultAlternative]);
  };
  const handleDeleteAlternative = (e: MouseEvent, alternativeIndex: number) => {
    e.preventDefault();
    if (alternatives.length !== 1) {
      setAlternatives(
        alternatives.filter((alternative, index) => index !== alternativeIndex)
      );
    }
  };
  const handleReset = (e: MouseEvent) => {
    e.preventDefault();
    resetFields();
  };
  const resetFields = () => {
    setAlternatives([defaultAlternative]);
    setStatement("");
    setCourse(Course.COMUNICACION);
    setDragGroups(["", ""]);
  };
  const handleCreateExcercise = async (e: MouseEvent) => {
    e.preventDefault();
    const excerciseDto = {
      type: ExcerciseType.DRAGDROP,
      statement,
      alternatives,
      course,
      teacher,
      dragGroups,
    };
    try {
      const res = await axios.post(excercisesUrl, excerciseDto);
      console.log(res.data);
      dispatch({
        type: EXCERCISE_CREATE,
        payload: res.data.excercise,
      });
      toast.info("Ejercicio creado con éxito");

      resetFields();
    } catch (error) {
      const errorAxios: AxiosError = error;
      console.log(errorAxios.message);
      toast.error("Error al agregar ejercicio");
    }
  };
  return (
    <>
      <form className="form-editor dnd">
        <div className="form-container">
          <div className="form-input curso-select">
            <label htmlFor="">Curso</label>
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
          <hr className="form-separation" />
          <div className="form-input">
            <label htmlFor="">Escribe tu pregunta aqui</label>
            <input
              className="input"
              type="text"
              placeholder="Ingresar pregunta"
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
            />
          </div>
          <hr className="form-separation" />
          <div className="alternatives-container">
            <div className="two-columns">
              <div className="form-input">
                <label htmlFor="">Grupo 1</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Nombre del grupo"
                  value={dragGroups[0]}
                  onChange={(e) => handleGroupNameChange(e, 0)}
                />
              </div>
              <div className="form-input">
                <label htmlFor="">Grupo 2</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Nombre del grupo"
                  value={dragGroups[1]}
                  onChange={(e) => handleGroupNameChange(e, 1)}
                />
              </div>
            </div>
            {/* Alternativas */}
            {alternatives.map((alternative, index) => (
              <div className="two-columns" key={index}>
                <div className="form-input">
                  <label htmlFor="">Alternativa</label>
                  <input
                    className="input"
                    type="text"
                    onChange={(e) => handleAlternativeTextChange(e, index)}
                    value={alternative.text}
                    placeholder="Ingresar alternativa"
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="">Grupo</label>

                  <select
                    className="input"
                    name="groups"
                    value={alternative.dragGroup}
                    onChange={(e) => handleAlternativeGroupChange(e, index)}
                  >
                    <option value="1">Grupo 1</option>
                    <option value="2">Grupo 2</option>
                  </select>
                </div>
                <button
                  className="delete-alternative"
                  onClick={(e) => handleDeleteAlternative(e, index)}
                >
                  <img src={imgDelete} alt="" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="addAlternatives">
          <button
            className="btn-add-alternative"
            onClick={handleAddAlternative}
          >
            Agregar alternativa
          </button>
        </div>
        <div className="button-group">
          <button className="btn-cancel" onClick={handleReset}>
            Reiniciar
          </button>
          <button className="btn-acept" onClick={handleCreateExcercise}>
            Aceptar
          </button>
        </div>
      </form>
      <PhonePreviewDnD
        excercise={{
          type: ExcerciseType.DRAGDROP,
          statement,
          alternatives,
          dragGroups,
          course,
        }}
      />
      {/* <ToastContainer limit={1} /> */}
    </>
  );
};

export default FormEditorDnD;
