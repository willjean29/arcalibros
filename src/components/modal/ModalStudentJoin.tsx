import React, { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import imgLogo from "../../assets/images/logo.png";
import { RootStore } from "../../store/store";
import axios from "axios";
import { classroomsURL } from "../../store/classroom/classroom.types";
import imgClose from "../../assets/images/btn-close.png";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalStudentJoin: React.FC<Props> = ({ setModalOpen }) => {
  const [classroomId, setClassroomId] = useState("");
  const studentId = useSelector(
    (state: RootStore) => state.user.user?._id as string
  );
  const [error, setError] = useState("");
  const handleJoinClassroom = async (e: any) => {
    e.preventDefault();
    if (classroomId === "") {
      setError("Ingrese un código");
    } else {
      setError("");
      const addStudentDto = {
        classroomId,
        studentId,
      };
      try {
        const res = await axios.post(
          classroomsURL.concat("addstudent"),
          addStudentDto
        );
        if (res.data.classroom) {
          setModalOpen(false);
        }
      } catch (error) {
        setError("El salon no existe");
        setClassroomId("");
      }
    }
  };
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <img width="200px" src={imgLogo} alt="" />
        <h3 className="welcometo">Unete a una clase</h3>
        {error && <p>{error}</p>}
        <p>Pega el código que tu profesor te ha proporcionado</p>
        <form onSubmit={handleJoinClassroom}>
          <input
            className="show-code"
            type="text"
            value={classroomId}
            onChange={(e) => setClassroomId(e.target.value)}
          />

          <button className="btn-modal" type="submit">
            Unirme
          </button>
        </form>
      </div>
    </>
  );
};

export default ModalStudentJoin;
