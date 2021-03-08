import React from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";
// import moment from "moment";

const Birthday = () => {
  const user = useSelector((state: RootStore) => state.user.user);
  return (
    <div className="events-by-classroom">
      <div className="event">
        {/* <div className="day">{birthday.split('/')[1]}</div>
              <div className="month">{birthday.split('/')[0]}</div>
              <div className="year">{birthday.split('/')[2]}</div> */}
        {/* <div className="day">{birthday}</div> */}
        <span>{user?.firstName} {user?.lastName}</span>
        <div className="event-title">
          Sabemos que las palabras no pueden sustituir un abrazo, pero sirven para
          hacerte llegar nuestros mejores deseos para tu cumpleaños. ¡Felíz cumpleaños!
        </div>
      </div>
    </div>
  );
};

export default Birthday;
