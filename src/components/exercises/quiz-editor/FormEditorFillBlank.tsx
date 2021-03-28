import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { createExcercise } from "../../../store/excercise/excercise.actions";
import {
  excercisesUrl,
  EXCERCISE_CREATE,
} from "../../../store/excercise/excercise.types";
import { RootStore } from "../../../store/store";
import { Course, ExcerciseType } from "../../../utils/enums";
import PhonePreviewFillBlank from "./PhonePreviewFillBlank";
import axios, { AxiosError } from "axios";

import imgAttach from "../../../assets/icons/attach.png";

const FormEditorFillBlank = () => {
  const [loading, setLoading] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const dispatch = useDispatch();
  const [photo, setNewPhoto] = useState<any>(null);
  const [fillAnswer, setFillAnswer] = useState("");
  const [statement, setStatement] = useState("");
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
  const [course, setCourse] = useState(filteredCourses[0]);
  const handleReset = (e: FormEvent) => {
    e.preventDefault();
    resetFields();
  };
  const resetFields = () => {
    setStatement("");
    setCourse(Course.COMUNICACION);
    setFillAnswer("");
    setPreview(null);
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

  const handleCreateExcercise = async (e: FormEvent) => {
    e.preventDefault();
    const alternatives = [] as any[];
    if (photo === null) {
      const excerciseDto = {
        type: ExcerciseType.FILLBLANK,
        statement,
        course,
        teacher,
        fillAnswer,
        alternatives,
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
        const errorAxios: AxiosError = error;
        console.log(errorAxios.message);
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
            type: ExcerciseType.FILLBLANK,
            statement,
            course,
            teacher,
            fillAnswer,
            alternatives,
            photo: `https://meet.arcavirtual.net/excercises/excercise-image/${res.data.photo}`,
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
            <label htmlFor="">Escribe una pregunta o enunciado</label>
            <input
              className="input"
              type="text"
              placeholder="Ingresar pregunta o enunciado"
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
            <div className="form-input">
              <label htmlFor="">Respuesta</label>
              <input
                className="input"
                type="text"
                placeholder="Ingrese la respuesta"
                value={fillAnswer}
                onChange={(e) => setFillAnswer(e.target.value)}
              />
            </div>
          </div>
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
      <PhonePreviewFillBlank
        excercise={{
          fillAnswer,
          type: ExcerciseType.FILLBLANK,
          statement,
          course,
        }}
        photo={preview ? preview : null}
      />
      {/* <ToastContainer limit={1} /> */}
    </>
  );
};

export default FormEditorFillBlank;
