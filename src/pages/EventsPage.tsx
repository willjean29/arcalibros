import React, { useEffect, useState } from "react";
import FullCalendar, {
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import Modal from "../components/modal/Modal";
import ModalAddEvent from "../components/modal/ModalAddEvent";
import ModalShowEvents from "../components/modal/ModalShowEvents";
import moment from "moment";
import { RootStore } from "../store/store";
import { useSelector } from "react-redux";
import { ClassroomEvent } from "../store/classroom/interfaces/classroom-events.interface";
import { UserType } from "../utils/enums";

const EventsPage = () => {
  const [event, setEvent] = useState<ClassroomEvent>();
  const user = useSelector(
    (state: RootStore) => state.user.user?.type as number
  );
  const selectedClassroomEvents = useSelector(
    (state: RootStore) =>
      state.classroom.selectedClassroomEvents as ClassroomEvent[]
  );

  

  const [modalDeleteClassroom, setModalDeleteClassroom] = useState(false);
  const [modalAddNewEvent, setModalAddNewEvent] = useState(false);
  const buttonText = {
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Dia",
    list: "Lista",
  };
  useEffect(() => {

  }, [selectedClassroomEvents]);
  const handleEventClick = (clickInfo: EventClickArg) => {
    setModalDeleteClassroom(true);
    const classroomEvent: ClassroomEvent = {
      title: clickInfo.event.title,
      start: moment(clickInfo.event.start).format("YYYY-MM-DD"),
    };
    setEvent(classroomEvent);
  };
  

  function renderEventContent(eventContent: EventContentArg) {
    // console.log(eventContent.event.title,eventContent.timeText)
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  }

  
  return (
    <>
    {
      // showEventDataTest()
    }
      {event && (
        <Modal modalOpen={modalDeleteClassroom}>
          <ModalShowEvents
            setModalOpen={setModalDeleteClassroom}
            event={event as ClassroomEvent}
          />
        </Modal>
      )}

      <Modal modalOpen={modalAddNewEvent}>
        <ModalAddEvent setModalOpen={setModalAddNewEvent} />
      </Modal>
      <div className="events-page">
        <div className="title">
          <h1>Eventos</h1>
          {user === UserType.TEACHER && (
            <button
              className="add-event-btn"
              onClick={() => setModalAddNewEvent(!modalAddNewEvent)}
            >
              Agregar evento { event }
            </button>
          )}
        </div>
        <div>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            locale="es"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            buttonText={buttonText}
            editable={false}
            eventContent={renderEventContent}
            selectable={true}
            selectMirror={true}
            eventClick={handleEventClick}
            dayMaxEvents={true}
            events={selectedClassroomEvents}
          />
        </div>
      </div>
    </>
  );
};

export default EventsPage;
