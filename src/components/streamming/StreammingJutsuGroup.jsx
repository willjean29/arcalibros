import React, { useState } from "react";

//REDUX
import { useParams } from "react-router";
import Stream from "./Stream";

const StreammingJutsuGroup = (props) => {

  let { id } = useParams();

  
  const classroomId = id;
  const name = props.name;
  const profileImg = props.profileImg;
  const [room, setRoom] = useState("");
  const [streamName, setStreamName] = useState("");

  const [password, setPassword] = useState("");
  const [onCall, setOnCall] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setRoom(classroomId);
    setStreamName(classroomId);
    if (room) setOnCall(true);
  };

  return onCall ? (
    <div className="streamming-container">
      <div className="streamming-box">
        <Stream
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
          <button
            onClick={handleClick}
            type="submit"
          >
            Conectarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default StreammingJutsuGroup;
