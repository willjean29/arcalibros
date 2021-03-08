import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import imgLogo from "../../assets/images/logo.png";
import imgClose from "../../assets/images/btn-close.png";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import { addClassroomEvent } from "../../store/classroom/classroom.actions";
interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalAddEvent: React.FC<Props> = ({ setModalOpen }) => {
  registerLocale("es", es);
  const classroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom?._id as string
  );
  const [eventTitle, setEventTitle] = useState("");
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState<any>(new Date());

  const handleStartDate = (date: any) => {
    setStartDate(date);
  };

  const handleAddEvent = (e: FormEvent) => {
    e.preventDefault();
    const classroomEvent = {
      title: eventTitle,
      classroom,
      start: moment(startDate).format("YYYY-MM-DD"),
    };
    dispatch(addClassroomEvent(classroomEvent));
    setModalOpen(false);
  };
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general modal-event">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <img width="200px" src={imgLogo} alt="" />
        <h3 className="welcometo">Agregue eventos a su agenda virtual.</h3>
        <p>A continuación, coloque un evento:</p>
        <form className="form-add-event" onSubmit={handleAddEvent}>
          <div className="form-group">
            <label htmlFor="">Evento:</label>
            <input
              type="text"
              placeholder="Escriba el nombre del evento"
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Fecha:</label>
            <DatePicker
              locale="es"
              className="inputModalAddEvent"
              selected={startDate}
              dateFormat={"dd/MM/yyyy"}
              onChange={(date) => handleStartDate(date)}
            />
          </div>
          <button className="btn-modal" type="submit">
            Agregar evento
          </button>
        </form>
      </div>
    </>
  );
};

export default ModalAddEvent;
