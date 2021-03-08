import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Classroom } from "../../store/classroom/interfaces/classroom.interface";
import { RootStore } from "../../store/store";
import moment from "moment";
import ParticipantPrintItem from "./ParticipantPrintItem";
import imgUser from "../../assets/images/user.png";
interface IProps {
  targetRef: any;
}
const ConnectedStudents: React.FC<IProps> = ({ targetRef }) => {
  const classroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom
  ) as Classroom;
  const connectedUsers = useSelector(
    (state: RootStore) => state.user.connectedUsers
  );

  return (
    <div className="connected-students" ref={targetRef}>
      <h3>Asistencia del día {moment().locale("es").format("Do MMMM YYYY")}</h3>
      <div className="two-columns-for-print">
        {classroom.students.map((student, index) =>
          connectedUsers.includes(student._id as string) ? (
            <ParticipantPrintItem
              key={index}
              imgUser={
                (student.profileImg as string) !== "default"
                  ? (student.profileImg as string)
                  : imgUser
              }
              status={
                connectedUsers.includes(student._id as string) ? true : false
              }
              name={student.firstName}
              lastname={student.lastName}
              email={student.email}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default ConnectedStudents;
