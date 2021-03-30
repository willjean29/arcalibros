import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sidebar/SideBar";
import { socket } from "../utils/sockets";
import { SocketEvent } from "../utils/enums";
import { Message } from "../store/messaging/interfaces/message.interface";
import MessagesPage from "./MessagesPage";
import ExercisesPage from "./ExercisesPage";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store/store";
import StartPage from "./StartPage";
import ClassroomPage from "./ClassroomPage";
import AdBanner from "../components/home/AdBanner";
import EmailDetailed from "../components/messages/EmailDetailed";
import TopicPage from "./TopicPage";
import { messageReceiveNew } from "../store/messaging/messaging.actions";
import { loadProfileImage } from "../store/user/user.actions";
import SettingsPage from "./SettingsPage";
import EvaluationsPage from "./EvaluationsPage";
import HomeworkPage from "./HomeworkPage";
import { Classroom } from "../store/classroom/interfaces/classroom.interface";
import {
  classroomStudentUpdate,
  updateClassroom,
} from "../store/classroom/classroom.actions";
import ModalSelectSchool from "../components/modal/ModalSelectSchool";
import LibraryPage from "./LibraryPage";
import ClassroomQuiz from "./ClassroomQuiz";
import EvaluationDetail from "../components/classroom/EvaluationDetail";
import StreammingPage from "./StreammingPage";
import { ExamClassroom } from "../store/exam/interfaces/exam-classroom.interface";
import ArcaExercises from "../components/exercises/ArcaExercises";
import StreammingGroupPage from "./StreammingGroupPage";
import { USERS_CONNECTED, USER_LOGOUT } from "../store/user/user.types";
import publicIp from "public-ip";
import Modal from "../components/modal/Modal";
const Home = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [modalSelectSchool, setModalSelectSchool] = useState(false);
  const user = useSelector((state: RootStore) => state.user.user);
  const publicIpDetect = async () => {
    try {
      const ip = await publicIp.v6();
      socket.users.emit(SocketEvent.UserLogin, {
        userId: user?._id as string,
        userIp: ip,
      });
      socket.messaging.emit(SocketEvent.SuscribeToMessages, user?.email);
    } catch (error) {
      const ip = await publicIp.v4();
      socket.users.emit(SocketEvent.UserLogin, {
        userId: user?._id as string,
        userIp: ip,
      });
      socket.messaging.emit(SocketEvent.SuscribeToMessages, user?.email);
    }
  };
  useEffect(() => {
    if (location.pathname !== "/plataforma/transmision") {
      publicIpDetect();
    }
  }, []);

  useEffect(() => {
    if (user?.schoolName === "default") {
      setModalSelectSchool(true);
    }
  }, [user]);

  useEffect(() => {
    dispatch(loadProfileImage(user?._id as string));
    socket.messaging.on(SocketEvent.MessageFromServer, (message: Message) => {
      dispatch(messageReceiveNew(message));
      const toastOptions = {
        onClick: () => history.push(`/plataforma/mensajes/${message._id}`),
      };
      toast.success(`Nuevo mensaje`, toastOptions);
    });

    socket.messaging.on(
      SocketEvent.MessageEvaluationFromServer,
      (message: Message) => {
        dispatch(messageReceiveNew(message));
        const toastOptions = {
          onClick: () => history.push(`/plataforma/mensajes/${message._id}`),
        };
        toast.success(`Nueva evaluación`, toastOptions);
      }
    );
  }, []);
  useEffect(() => {
    socket.users.on(
      SocketEvent.ConnectedUsersFromServer,
      (usersConnected: string[]) => {
        if (usersConnected) {
          dispatch({
            type: USERS_CONNECTED,
            payload: usersConnected,
          });
        }
      }
    );
  }, []);

  useEffect(() => {
    socket.users.on(SocketEvent.ClassroomToStudent, (classroom: Classroom) => {
      dispatch(classroomStudentUpdate(classroom));
    });
  }, []);

  useEffect(() => {
    socket.users.on(SocketEvent.UserAlreadyConnected, () => {
      localStorage.clear();
      dispatch({
        type: USER_LOGOUT,
      });
      history.push("/");
      toast.error("El usuario ya está conectado");
    });
  }, []);
  useEffect(() => {
    socket.users.on(
      SocketEvent.ExamClassroomStart,
      (examClassroom: ExamClassroom) => {
        const toastOptions = {
          onClick: () =>
            history.push(`/plataforma/examen/${examClassroom._id as string}`),
          autoClose: 15000,
          closeOnClick: true,
          hideProgressBar: true,
        };
        toast.success(`${examClassroom.name} ha iniciado`, toastOptions);
        toast.clearWaitingQueue();
      }
    );
  });

  // window.addEventListener("beforeunload", (ev) => {
  //   ev.preventDefault();
  //   return (ev.returnValue = "Seguro que quiere salir?");
  // });

  return (
    <>
      <NavBar />
      <Modal modalOpen={modalSelectSchool}>
        <ModalSelectSchool setModalOpen={setModalSelectSchool} />
      </Modal>
      <div className="menu-container">
        {/* <SideBar /> */}

        <div className="dashboard">
          {/* <ToastContainer limit={1} /> */}
          <Switch>
            <Route path="/plataforma/ajustes" exact component={SettingsPage} />
            <Route
              path="/plataforma/examen/:id"
              exact
              component={ClassroomQuiz}
            />
            <Route
              path="/plataforma/evaluaciones"
              exact
              component={EvaluationsPage}
            />
            <Route
              path="/plataforma/ejercicios-arca"
              exact
              component={ArcaExercises}
            />
            <Route path="/plataforma" exact component={StartPage} />
            <Route
              path="/plataforma/salon/evaluacion/:id"
              exact
              component={EvaluationDetail}
            />
            <Route
              path="/plataforma/salon/:id"
              exact
              component={ClassroomPage}
            />
            <Route path="/plataforma/libros" exact component={LibraryPage} />
            <Route path="/plataforma/tema/:id" exact component={TopicPage} />
            <Route path="/plataforma/mensajes" exact component={MessagesPage} />
            <Route
              path="/plataforma/mensajes/:id"
              exact
              component={EmailDetailed}
            />
            <Route
              path="/plataforma/grupo-transmision/:id"
              exact
              component={StreammingGroupPage}
            />
            <Route
              path="/plataforma/transmision"
              exact
              component={StreammingPage}
            />
            <Route
              path="/plataforma/ejercicios"
              exact
              component={ExercisesPage}
            />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Home;
