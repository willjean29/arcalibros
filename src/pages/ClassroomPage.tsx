import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useLocation } from "react-router-dom";
import ClassroomNavbar from "../components/classroom/ClassroomNavbar";
import HomeClassroom from "../components/classroom/HomeClassroom";
import Participants from "../components/classroom/Participants";
import Topic from "../components/classroom/Topic";

import imgBanned from "../assets/icons/icons8-denied-100.png";
import {
  loadBannedStudents,
  loadClassroomDetail,
  loadClassroomEvents,
  updateBannedStudent,
  updateClassroom,
} from "../store/classroom/classroom.actions";
import { RootStore } from "../store/store";
import { MENU_CLASSROOM_SELECT, SELECT_CLASSROOM } from "../store/ui/ui.types";
import { socket } from "../utils/sockets";
import { SocketEvent } from "../utils/enums";
import { Classroom } from "../store/classroom/interfaces/classroom.interface";
import ClassroomEvaluations from "./ClassroomEvaluations";
import WorkGroups from "../components/classroom/WorkGroups";

import Loading from "../components/loading/Loading";
import EventsPage from "./EventsPage";
import { BannedStudent } from "../store/classroom/interfaces/banned-student.interface";
import { deleteSocketExam } from "../store/exam/exam.actions";

interface IProps {
  id: string;
}
enum SelectionType {
  HOME = 1,
  TOPICS = 2,
  PARTICIPANTS = 3,
  WORKGROUPS = 4,
  EVALUATIONS = 5,
  EVENTS = 6,
}
const ClassroomPage = ({ match }: RouteComponentProps<IProps>) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = useSelector(
    (state: RootStore) => state.user.user?._id as string
  );
  const [clients, setClients] = useState([] as string[]);
  const selectedClassroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom
  );
  const selectedClassroomBannedStudents = useSelector(
    (state: RootStore) => state.classroom.selectedClassroomBannedStudents
  );
  const userBanned = selectedClassroomBannedStudents?.find(
    (bannedUser) =>
      bannedUser.active === true &&
      bannedUser.classroom === (selectedClassroom?._id as string) &&
      bannedUser.student === userId
  );
  const menuSelectedItem = useSelector(
    (state: RootStore) => state.ui.menuClassroomSelectedItem
  );

  useEffect(() => {
    socket.classrooms.connect();

    socket.classrooms.emit(SocketEvent.SuscribeToClassroom, {
      classroomId: match.params.id,
      userId,
    });
    dispatch({ type: MENU_CLASSROOM_SELECT, payload: null });
    dispatch(loadClassroomDetail(match.params.id));
    dispatch(loadClassroomEvents(match.params.id));
    dispatch(loadBannedStudents(match.params.id));
    // return () => {
    //   socket.classrooms.emit(SocketEvent.LeaveUserFromClassroom, {
    //     classroomId: match.params.id,
    //     userId,
    //   });
    //   socket.classrooms.disconnect();
    // };
  }, [location]);
  useEffect(() => {
    socket.users.on(
      SocketEvent.ConnectedUsersFromServer,
      (usersConnected: string[]) => {
        setClients(usersConnected);
      }
    );
    socket.classrooms.on(
      SocketEvent.BannedStudentToClient,
      (bannedStudent: BannedStudent) => {
        dispatch(updateBannedStudent(bannedStudent));
      }
    );
    socket.classrooms.on(
      SocketEvent.ExamClassroomDeleted,
      (examClassroomId: string) => {
        dispatch(deleteSocketExam(examClassroomId));
      }
    );
  }, []);

  useEffect(() => {
    socket.classrooms.on(
      SocketEvent.ClassroomFromServer,
      (classroom: Classroom) => {
        dispatch(updateClassroom(classroom));
      }
    );
  }, []);
  useEffect(() => {}, [menuSelectedItem]);
  useEffect(() => {}, [selectedClassroom]);
  useEffect(() => {}, [selectedClassroomBannedStudents, userBanned]);
  return selectedClassroom === undefined ? (
    <Loading />
  ) : selectedClassroomBannedStudents && userBanned ? (
    <div className="banned-container">
      <div className="banned-content">
        <img src={imgBanned} alt="" />
        <p>
          Usted está suspendido del salón, contacte con su tutor o docente a
          cargo.
        </p>
      </div>
    </div>
  ) : (
    <div className="classroom-page">
      <div className="classroom-page-container global-container">
        <ClassroomNavbar />
        {(menuSelectedItem === SelectionType.HOME ||
          menuSelectedItem === null) && <HomeClassroom />}
        {menuSelectedItem === SelectionType.TOPICS && <Topic />}
        {menuSelectedItem === SelectionType.PARTICIPANTS && (
          <Participants clients={clients} />
        )}
        {menuSelectedItem === SelectionType.WORKGROUPS && <WorkGroups />}
        {menuSelectedItem === SelectionType.EVALUATIONS && (
          <ClassroomEvaluations />
        )}
        {menuSelectedItem === SelectionType.EVENTS && <EventsPage />}
      </div>
    </div>
  );
};

export default ClassroomPage;
