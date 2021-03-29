import React, { useState, MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlternativeDto } from "../../../store/excercise/dtos/alternative.dto";
import {
  createExcercise,
  excerciseFlag,
} from "../../../store/excercise/excercise.actions";
import { RootStore } from "../../../store/store";
import { ToastContainer, toast } from "react-toastify";
import { Course, ExcerciseType } from "../../../utils/enums";
import PhonePreviewSelection from "./PhonePreviewSelection";

import imgDelete from "../../../assets/icons/delete-alt.png";
import imgAttach from "../../../assets/icons/attach.png";
import {
  excercisesUrl,
  EXCERCISE_CREATE,
} from "../../../store/excercise/excercise.types";
import axios, { AxiosError } from "axios";

const FormEditorSelection = () => {
  const [loading, setLoading] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const defaultAlternative: AlternativeDto = {
    text: "",
  };
  const dispatch = useDispatch();
  const teacher = useSelector(
    (state: RootStore) => state.user.user?._id
  ) as string;
  const excercises = useSelector(
    (state: RootStore) => state.excercise.excercises
  );
  const courses = useSelector(
    (state: RootStore) => state.classroom.classrooms
  ).map((classroom) => classroom.course);
  const onlyUnique = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
  };
  const filteredCourses = courses.filter(onlyUnique);
  const [alternatives, setAlternatives] = useState([
    defaultAlternative,
  ] as AlternativeDto[]);
  const [statement, setStatement] = useState("");
  const [photo, setNewPhoto] = useState<any>(null);
  const [selectionAnswer, setSelectionAnswer] = useState(
    defaultAlternative as AlternativeDto
  );
  const [course, setCourse] = useState(filteredCourses[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {}, [excercises]);
  const handleAlternativeTextChange = (e: any, alternativeIndex: number) => {
    setAlternatives(
      alternatives.map((alternative, index) =>
        index === alternativeIndex
          ? { ...alternative, text: e.target.value }
          : alternative
      )
    );
  };

  const handleAddAlternative = (e: MouseEvent) => {
    e.preventDefault();
    if (alternatives.length < 4) {
      setAlternatives([...alternatives, defaultAlternative]);
    }
  };

  const handleDeleteAlternative = (e: MouseEvent, alternativeIndex: number) => {
    e.preventDefault();
    if (alternatives.length !== 1) {
      setAlternatives(
        alternatives.filter((alternative, index) => index !== alternativeIndex)
      );
    }
  };

  const handleSelectionAnswer = (
    e: any,
    alternative: AlternativeDto,
    index: number
  ) => {
    e.preventDefault();
    setSelectionAnswer(alternative);
    setSelectedIndex(index);
  };
  const resetFields = () => {
    setAlternatives([defaultAlternative]);
    setStatement("");
    setCourse(filteredCourses[0]);
    setSelectionAnswer(defaultAlternative);
    setPreview(null);
  };
  const handleReset = (e: MouseEvent) => {
    e.preventDefault();
    resetFields();
  };

  function handleUpload(event: any) {
    setNewPhoto(event.target.files[0]);
    if (event.target.files!.length > 0) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setPreview(event.target?.result);
      };
      reader.readAsDataURL(event.target.files![0]);
    }
  }

  const handleCreateExcercise = async (e: MouseEvent) => {
    e.preventDefault();
    if (photo === null) {
      const excerciseDto = {
        type: ExcerciseType.SELECTION,
        statement,
        alternatives,
        course,
        selectionAnswer: alternatives[selectedIndex].text,
        teacher,
      };

      try {
        const res = await axios.post(excercisesUrl, excerciseDto);

        if (res.data.excercise) {
          dispatch({
            type: EXCERCISE_CREATE,
            payload: res.data.excercise,
          });
          toast.info("Ejercicio creado con éxito");
          resetFields();
        }
      } catch (error) {
        toast.error("Error al agregar ejercicio");
      }
    } else {
      const formData = new FormData();
      formData.append("file", photo);
      const hour = Date.now();
      try {
        setLoading(true);
        const res = await axios.post(
          excercisesUrl.concat(`upload/${hour}`),
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.data.photo) {
          const excerciseDto = {
            type: ExcerciseType.SELECTION,
            statement,
            alternatives,
            course,
            selectionAnswer: alternatives[selectedIndex].text,
            teacher,
            photo: `http://localhost:4000/excercises/excercise-image/${res.data.photo}`,
          };
          try {
            const res = await axios.post(excercisesUrl, excerciseDto);

            if (res.data.excercise) {
              dispatch({
                type: EXCERCISE_CREATE,
                payload: res.data.excercise,
              });
              toast.info("Ejercicio creado con éxito");
              resetFields();
            }
          } catch (error) {
            toast.error("Error al agregar ejercicio");
          }
        }
      } catch (error) {}
    }
  };

  return (
    <>
      <form className="form-editor selection">
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

          <div className="form-input">
            <label htmlFor="">Ingrese una imagen</label>
            <label htmlFor="choose-file" className="button">
              <img src={imgAttach} alt="" />
              <p>Seleccione una imagen</p>
              <input
                type="file"
                className="choose-files"
                id="choose-file"
                accept="image/*"
                onChange={handleUpload}
              />
            </label>
          </div>
          <hr className="form-separation" />
          <div className="alternatives-container">
            {alternatives.map((alternative, index) => (
              <div className="form-input" key={index}>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={selectedIndex === index}
                  onChange={(e) => handleSelectionAnswer(e, alternative, index)}
                />
                <div className="inputfield">
                  <label htmlFor="">Opción de respuesta {index + 1}</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Ingresar alternativa"
                    value={alternative.text}
                    onChange={(e) => handleAlternativeTextChange(e, index)}
                  />
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
      <PhonePreviewSelection
        excercise={{
          type: ExcerciseType.SELECTION,
          statement,
          alternatives,
          course,
          selectionAnswer: selectionAnswer.text,
        }}
        photo={preview ? preview : null}
      />
      {/* <ToastContainer limit={1} /> */}
    </>
  );
};

export default FormEditorSelection;
