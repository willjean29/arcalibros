import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import imgUser from "../../assets/images/user.png";
import imgBack from "../../assets/icons/back-to.png";
import imgCalendar from "../../assets/icons/calendar.png";
import { Classroom } from "../../store/classroom/interfaces/classroom.interface";
import { RootStore } from "../../store/store";
import ParticipantItem from "./ParticipantItem";
import { socket } from "../../utils/sockets";
import { SocketEvent } from "../../utils/enums";
import Print from "../print-html/Print";
import ParticipantPrintItem from "./ParticipantPrintItem";
import ConnectedStudents from "./ConnectedStudents";
//@ts-ignore
import ReactToPdf from "react-to-pdf";
import moment from "moment";
import { BannedStudent } from "../../store/classroom/interfaces/banned-student.interface";
interface IProps {
  clients: string[];
}
const Participants: React.FC<IProps> = ({ clients }) => {
  const targetRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const options = {
    orientation: "landscape",
    format: [1000, 1000],
    precision: 0,
  };
  const actualUser = useSelector(
    (state: RootStore) => state.user.user?._id as string
  );

  const selectedClassroomBannedStudents = useSelector(
    (state: RootStore) => state.classroom.selectedClassroomBannedStudents
  );
  const classroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom
  ) as Classroom;
  const connectedUsers = useSelector(
    (state: RootStore) => state.user.connectedUsers
  );
  const profileImg = useSelector(
    (state: RootStore) => state.user.profileImg
  ) as string;

  useEffect(() => {
    socket.classrooms.on(SocketEvent.ClassroomFromServer, () => {});
  }, []);

  useEffect(() => {}, [connectedUsers, selectedClassroomBannedStudents]);
  const [showDownload, setshowDownload] = useState(false);

  enum Asistance {
    ASISTANCE_INFO = 1,
    DOWNLOAD = 2,
  }

  return (
    <div className="user-list-section">
      <div className="export-list">
        {showDownload ? (
          <>
            <div
              className="btn-export-list"
              onClick={() => setshowDownload(false)}
            >
              <img src={imgBack} alt="" />
            </div>
            <ReactToPdf
              targetRef={targetRef}
              filename={`${classroom.course} ${classroom.grade}° ${
                classroom.section
              } - Asistencia - ${moment()
                .locale("es")
                .format("DD MM YYYY")}.pdf`}
              options={options}
            >
              {({ toPdf }: { toPdf: any }) => (
                <div className="btn-export-list" onClick={toPdf}>
                  <img src={imgCalendar} alt="" />
                  Descargar
                </div>
              )}
            </ReactToPdf>
          </>
        ) : (
          <div
            className="btn-export-list"
            onClick={() => setshowDownload(true)}
          >
            <img src={imgCalendar} alt="" />
            Asistencia
          </div>
        )}
      </div>

      {showDownload ? (
        <ConnectedStudents targetRef={targetRef} />
      ) : (
        <>
          <h2>Profesor</h2>
          <hr className="separation" />
          <div className="two-components">
            <ParticipantItem
              id={classroom.teacher._id as string}
              imgUser={
                (classroom.teacher.profileImg as string) !== "default"
                  ? (classroom.teacher.profileImg as string)
                  : imgUser
              }
              banned={false}
              type="Profesor"
              name={classroom.teacher.firstName}
              lastname={classroom.teacher.lastName}
              email={classroom.teacher.email}
              status={
                connectedUsers.includes(classroom.teacher._id as string)
                  ? true
                  : false
              }
            />
          </div>
          <h2 className="mt-20">Alumnos</h2>
          <hr className="separation" />
          <div className="two-components">
            {classroom.students.map((student, index) => (
              <ParticipantItem
                id={student._id as string}
                key={index}
                banned={
                  selectedClassroomBannedStudents?.find(
                    (bannedUser) =>
                      bannedUser.active === true &&
                      bannedUser.classroom === (classroom?._id as string) &&
                      bannedUser.student === student._id
                  )
                    ? true
                    : false
                }
                imgUser={
                  (student.profileImg as string) !== "default"
                    ? (student.profileImg as string)
                    : imgUser
                }
                type="Alumno"
                name={student.firstName}
                lastname={student.lastName}
                email={student.email}
                status={
                  connectedUsers.includes(student._id as string) ? true : false
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Participants;
