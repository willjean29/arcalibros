import React, { Dispatch, SetStateAction } from "react";
import imgClose from "../../assets/images/btn-close.png";
import moment from "moment";
import "moment/locale/es";
import { ClassroomEvent } from "../../store/classroom/interfaces/classroom-events.interface";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  event: ClassroomEvent;
};

const ModalShowEvents: React.FC<Props> = ({ setModalOpen, event }) => {
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Eventos:</h3>
        {/* EVENT ITEM */}
        <div className="event-container">
          <div className="date">
            {moment(event.start).locale("es").format("Do MMMM YYYY")}
          </div>
          <div className="description">
            <p>{event.title}</p>
          </div>
        </div>
        {/* EVENT ITEM */}
        <form>
          <div className="deleteModalOptions">
            <button className="btn-modal" onClick={() => setModalOpen(false)}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalShowEvents;
