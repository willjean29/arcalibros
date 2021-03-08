import { AxiosError } from "axios";
import moment from "moment";
import axios from "axios";
import React, { Dispatch, SetStateAction, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import imgLogo from "../../assets/images/logo.png";
import imgClose from "../../assets/images/btn-close.png";
import {
  messagingURL,
  MESSAGE_NEW,
} from "../../store/messaging/messaging.types";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  classroomId: string;
  teacherEmail: string;
  teacherName: string;
  course: string;
  grade: string;
  section: string;
};

const ModalAddStudent: React.FC<Props> = ({
  setModalOpen,
  classroomId,
  teacherEmail,
  teacherName,
  course,
  grade,
  section,
}) => {
  const dispatch = useDispatch();
  const [messageErrors, setMessageErrors] = useState([] as string[]);
  const [loading, setLoading] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");

  const handleSendInvitation = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (loading) return;
    const addUserUrl = "http://localhost:4000/classrooms/addstudent/";
    const messageText = `<p> Estimado alumno el profesor ${teacherName} te invita a unirte al salon de clases del curso  de  ${course}- ${grade}° ${section} </p> para unirte haz click en el siguiente enlace: <a href="${addUserUrl.concat(
      classroomId + "CAMBIO"
    )}" target="_blank"> UNIRSE AL SALON </a>`;
    const messageDto = {
      messageText,
      receptor: studentEmail,
      read: false,
      sender: teacherEmail,
      subject: "Invitación a salón de clases",
      date: moment().locale("es").format("LLL"),
    };

    try {
      const res = await axios.post(
        messagingURL.concat("invitation/classroom"),
        messageDto
      );

      dispatch({
        type: MESSAGE_NEW,
        payload: undefined,
      });
      setModalOpen(false);
      setLoading(false);
    } catch (error) {
      const errorAxios: AxiosError = error;
      setMessageErrors(errorAxios.response?.data.message as string[]);
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
        <h3 className="welcometo">Invite a sus alumnos a la clase</h3>
        <p>Comparta el código para agregar alumnos a su clase</p>
        <form onSubmit={handleSendInvitation}>
          <input
            className="show-code"
            type="text"
            value={classroomId}
            contentEditable="false"
            onChange={(e) => {}}
          />
          <br />
          <h3>Ó</h3>
          <br />
          <p>
            Invite alumnos a unirse a su salón enviandoles un correo electrónico
            (correo registrado en la plataforma). Recibirán el enlace para
            unirse.
          </p>
          <input
            placeholder="Ingrese email de la plataforma"
            onChange={(e) => setStudentEmail(e.target.value)}
          ></input>
          <button className="btn-modal" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default ModalAddStudent;
