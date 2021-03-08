import React from "react";

interface Props {
  imgUser: string;
  name: string;
  lastname: string;
  email: string;
  status: boolean;
}

const ParticipantPrintItem: React.FC<Props> = ({
  imgUser,
  name,
  status,
  lastname,
  email,
}) => {
  return (
    <div className="student-card">
      <div className="image">
        <img src={imgUser} alt="" />
        <span className="connected"></span>
      </div>

      <div className="userlist-info">
        <h4>{`${name} ${lastname}`}</h4>
        <h6>{email}</h6>
      </div>
    </div>
  );
};

export default ParticipantPrintItem;
