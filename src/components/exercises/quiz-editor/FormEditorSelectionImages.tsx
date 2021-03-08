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
import PhonePreviewSelectionImages from "./PhonePreviewSelectionImages";
interface Photos {
  photo1?: File;
  photo2?: File;
  photo3?: File;
  photo4?: File;
}
const FormEditorSelectionImages = () => {
  const [loading, setLoading] = useState<any>(null);
  const [preview1, setPreview1] = useState<any>(null);
  const [preview2, setPreview2] = useState<any>(null);
  const [preview3, setPreview3] = useState<any>(null);
  const [preview4, setPreview4] = useState<any>(null);
  const [photos, setPhotos] = useState<any>({} as Photos);
  const [formPhotos, setFormPhotos] = useState([] as any[]);
  const defaultAlternative: AlternativeDto = {
    text: "",
    photo: "",
    uuid: Date.now().toString(),
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
  const [photo1, setNewPhoto1] = useState<any>(null);
  const [photo2, setNewPhoto2] = useState<any>(null);
  const [photo3, setNewPhoto3] = useState<any>(null);
  const [photo4, setNewPhoto4] = useState<any>(null);
  const [selectionAnswer, setSelectionAnswer] = useState(
    defaultAlternative as AlternativeDto
  );
  const [course, setCourse] = useState(filteredCourses[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {}, [excercises]);

  const handleAddAlternative = (e: MouseEvent) => {
    e.preventDefault();
    if (alternatives.length < 4) {
      setAlternatives([...alternatives, defaultAlternative]);
    }
  };

  const handleDeleteAlternative = (e: MouseEvent, alternativeIndex: number, id: string | undefined) => {
    e.preventDefault();
    if (alternatives.length !== 1) {
      setAlternatives(
        alternatives.filter((alternative, index) => index !== alternativeIndex)
      );
      console.log(id);
    }

   
    if(preview1){
      if(preview1.id === id){
        setPreview1(null);
        setNewPhoto1(null);
        const state = {...photos};
        state['photo1'] = null;
        setPhotos(state);
      }
    }

    if(preview2){
      if(preview2.id === id){
        setPreview2(null);
        setNewPhoto2(null);
        const state = {...photos};
        state['photo2'] = null;
        setPhotos(state);
      }
    }

    if(preview3){
      if(preview3.id === id){
        setPreview3(null);
        setNewPhoto3(null);
        const state = {...photos};
        state['photo3'] = null;
        setPhotos(state);
      }
    }

    if(preview4){
      if(preview4.id === id){
        setPreview4(null);
        setNewPhoto4(null);
        const state = {...photos};
        state['photo4'] = null;
        setPhotos(state);
      }
    }

    
    // preview2 && preview2.id === id && setPreview2(null);
    // preview3 && preview3.id === id && setPreview3(null);
    // preview4 && preview4.id === id && setPreview4(null);

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
    setPreview1(null);
    setPreview2(null);
    setPreview3(null);
    setPreview4(null);
    setPhotos({} as Photos);
  };
  const handleReset = (e: MouseEvent) => {
    e.preventDefault();
    resetFields();
  };

  function handleUpload(event: any, index: number, id: string | undefined) {
    switch (index) {
      case 0:
        let newState1 = { ...photos };
        newState1[`photo${index + 1}`] = event.target.files[0];
        setPhotos(newState1);
        setFormPhotos([...formPhotos, event.target.files[0]]);
        setNewPhoto1(event.target.files[0]);

        if (event.target.files!.length > 0) {
          const reader = new FileReader();

          reader.onload = (event) => {
            setPreview1({
              id,
              uri: event.target?.result
            });
          };
          reader.readAsDataURL(event.target.files![0]);
        }

        break;
      case 1:
        let newState2 = { ...photos };
        newState2[`photo${index + 1}`] = event.target.files[0];
        setPhotos(newState2);
        setFormPhotos([...formPhotos, event.target.files[0]]);
        setNewPhoto2(event.target.files[0]);
        if (event.target.files!.length > 0) {
          const reader = new FileReader();

          reader.onload = (event) => {
            setPreview2({
              id,
              uri: event.target?.result
            });
          };
          reader.readAsDataURL(event.target.files![0]);
        }
        break;
      case 2:
        let newState3 = { ...photos };
        newState3[`photo${index + 1}`] = event.target.files[0];
        setPhotos(newState3);
        setFormPhotos([...formPhotos, event.target.files[0]]);
        setNewPhoto3(event.target.files[0]);
        if (event.target.files!.length > 0) {
          const reader = new FileReader();

          reader.onload = (event) => {
            setPreview3({
              id,
              uri: event.target?.result
            });
          };
          reader.readAsDataURL(event.target.files![0]);
        }
        break;
      case 3:
        let newState4 = { ...photos };
        newState4[`photo${index + 1}`] = event.target.files[0];
        setPhotos(newState4);
        setFormPhotos([...formPhotos, event.target.files[0]]);
        setNewPhoto4(event.target.files[0]);
        if (event.target.files!.length > 0) {
          const reader = new FileReader();

          reader.onload = (event) => {
            setPreview4({
              id,
              uri: event.target?.result
            });
          };
          reader.readAsDataURL(event.target.files![0]);
        }
        break;
    }
  }

  const handleCreateExcercise = async (e: MouseEvent) => {
    e.preventDefault();

    const formData = new FormData();
    const files = (Object.values(photos)).filter((photo:any) => photo!==null) as File[];
    files.forEach((photo) => formData.append("files", photo));
    try {
      setLoading(true);
      const res = await axios.post(
        excercisesUrl.concat(`upload-multiple/`),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.files) {
        const newAlernatives = alternatives.map((alternative, index) => ({
          text: res.data.files[index],
          photo: res.data.files[index],
        }));

        setAlternatives(newAlernatives);
        setSelectionAnswer(newAlernatives[selectedIndex]);
        const excerciseDto = {
          type: ExcerciseType.SELECTION_IMAGES,
          statement,
          alternatives: newAlernatives,
          course,
          selectionAnswer: newAlernatives[selectedIndex].text,
          teacher,
        };
        const res1 = await axios.post(excercisesUrl, excerciseDto);

        if (res1.data.excercise) {
          dispatch({
            type: EXCERCISE_CREATE,
            payload: res1.data.excercise,
          });
          toast.info("Ejercicio creado con éxito");
          resetFields();
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("Error al agregar ejercicio");
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
              onSubmit={(e) => e.preventDefault()}
            />
          </div>

          <hr className="form-separation" />
          <div className="alternatives-container">
            {alternatives.map((alternative, index) => (
              <div className="form-input-images" key={index}>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={selectedIndex === index}
                  onChange={(e) => handleSelectionAnswer(e, alternative, index)}
                />
                <div>
                  <label htmlFor="">Ingrese una imagen</label>
                  <label htmlFor={`choose-file-${index}`} className="button">
                    <img src={imgAttach} alt="" />
                    <p>Seleccione una imagen</p>
                    <input
                      type="file"
                      className="choose-files"
                      id={`choose-file-${index}`}
                      accept="image/*"
                      onChange={(e) => handleUpload(e, index, alternative.uuid)}
                    />
                  </label>
                  {photos[`photo${index + 1}`] &&
                    photos[`photo${index + 1}`].name}
                </div>
                <button
                  className="delete-alternative"
                  onClick={(e) => handleDeleteAlternative(e, index, alternative.uuid)}
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
      <PhonePreviewSelectionImages
        excercise={{
          type: ExcerciseType.SELECTION,
          statement,
          alternatives,
          course,
          selectionAnswer: selectionAnswer.text,
        }}
        photo1={preview1 ? preview1.uri : null}
        photo2={preview2 ? preview2.uri : null}
        photo3={preview3 ? preview3.uri : null}
        photo4={preview4 ? preview4.uri : null}
      />
      {/* <ToastContainer limit={1} /> */}
    </>
  );
};

export default FormEditorSelectionImages;
