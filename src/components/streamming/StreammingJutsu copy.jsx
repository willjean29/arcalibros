import React, { useState } from "react";

//REDUX
import { useSelector } from "react-redux";
import Stream from "./Stream";
import StreamArca from "./StreamArca";

const StreammingJutsu = (props) => {
  const classrooms = props.classroom;
  const name = props.name;
  const profileImg = props.profileImg;
  const [btnDisabled, setbtnDisabled] = useState(true);
  const [room, setRoom] = useState("");
  const [streamName, setStreamName] = useState("");

  const [password, setPassword] = useState("");
  const [onCall, setOnCall] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    console.log(password);
    if (!room.trim()) {
      alert("Debes ingresar un Codigo o sala");
    }
    if (room) setOnCall(true);
  };

  const setRoomName = (e) => {
    e.preventDefault();
    const courseDetailed = e.target.value.split(",");
    console.log(courseDetailed[0]);
    const nameRoom =
      courseDetailed[1] + " " + courseDetailed[2] + " " + courseDetailed[3];
    setbtnDisabled(false);
    setRoom(courseDetailed[0]);
    setStreamName(nameRoom);
  };
  console.info("bbb", profileImg);
  return onCall ? (
    <div className="streamming-container">
      <div className="streamming-box">
        <StreamArca
          streamRoom={room}
          profileImg={profileImg}
          streamRoomName={streamName}
          name={name}
          streamPassword={password}
        />
      </div>
    </div>
  ) : (
    <div className="streamming-container">
      <div className="streamming-box">
        <form className="form-style">
          <div className="content-select">
            <select onChange={(e) => setRoomName(e)}>
              <option value="">Selecciona un curso</option>
              {classrooms &&
                classrooms.map((classroom, index) => (
                  <option
                    value={`${classroom._id},${classroom.course},${classroom.grade},${classroom.section}`}
                  >{`${classroom.course} ${classroom.grade}° ${classroom.section}`}</option>
                ))}
            </select>
            <i></i>
          </div>
          <input
            className="password-streamming"
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={room === "" ? "disabled" : ""}
            onClick={handleClick}
            type="submit"
          >
            Unirse
          </button>
        </form>
      </div>
    </div>
  );
};

export default StreammingJutsu;
