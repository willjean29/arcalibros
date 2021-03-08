import React from "react";
import { ClassroomEvent } from "../../store/classroom/interfaces/classroom-events.interface";
import Slider from "react-slick";
import moment from "moment";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";

interface ClassroomEventDetail {
  _id?: string;
  title?: string;
  start?: string;
  classroom?: string;
}

interface IEventsByClassroom {
  events: ClassroomEvent[];
}

interface birthday {
  birthday: string;
}

const EventsByClassroom: React.FC<IEventsByClassroom> = ({ events }) => {


  const day = moment().date();
  const year = moment().year();
  const month = moment().month() + 1;
  let newMonth = "";
  if (month < 10) {
    newMonth = `0${month}`;
  }
  console.log(events)
  const filterByDate = events.filter( 
    (event) => {
      console.log(event.start, "userBirthday")
      return event.start.split("-")[2] === `${"userBirthday"}`
    }
  );


  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: 30,
    slidesToShow: filterByDate.length < 4 ? filterByDate.length : 3,
    slidesToScroll: 1,
  };

  return (
    <div className="events-by-classroom">
      {/* <div className="shadow"></div>

      {filterByDate.length > 0 ? (
        <Slider {...settings}>
          {filterByDate.map((event) => (
            <div className="event" key={event.title}>
              <div className="day">{event.start}</div>
              <div className="month">Septiembre</div>
              <div className="event-title">{event.title}</div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="events-message">Hoy no hay eventos <span role="img" aria-label="calendars">📅 📅 📅</span></p>
      )}*/}
    </div> 
  );
};

export default EventsByClassroom;
