import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";

import imgUser from "../../assets/images/user.png";

import imgHome from "../../assets/icons/homev2.svg";
import imgClassroom from "../../assets/icons/classroomv2.svg";
import imgBooks from "../../assets/icons/booksv2.svg";
import imgStreamming from "../../assets/icons/streammingv2.svg";
import imgTasks from "../../assets/icons/arca-exercises.png";
import imgEvaluations from "../../assets/icons/evaluations.png";
import imgExercise from "../../assets/icons/exercises.png";
import imgWhiteboard from "../../assets/icons/whiteboard.png";
import imgMessage from "../../assets/icons/messagev2.svg";
import imgFacebook from "../../assets/images/facebook-icon.png";
import imgInstagram from "../../assets/images/instagram-icon.png";
import imgTwitter from "../../assets/images/twitter-icon.png";

import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import { SELECT_CLASSROOM, SIDEBAR_SELECT_ITEM } from "../../store/ui/ui.types";
import { SidebarItem, UserType } from "../../utils/enums";
import SidebarItemSelection from "./SidebarItemSelection";
import SideBarCard from "./SideBarCard";
import { Classroom } from "../../store/classroom/interfaces/classroom.interface";

interface Props {
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
}

const SideBar: React.FC<Props> = ({ setSidebarOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStore) => state.user.user);
  const selectedItem = useSelector(
    (state: RootStore) => state.ui.sidebarSelectedItem
  );
  const classrooms = useSelector(
    (state: RootStore) => state.classroom.classrooms
  );
  const selectedClassroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom
  );

  const uiSelectedClassroom = useSelector(
    (state: RootStore) => state.ui.selectedClassroom
  );
  const [showItems, setShowItems] = useState(false);
  const profileImg = useSelector(
    (state: RootStore) => state.user.profileImg
  ) as string;
  
  const handleSelectItem = (e: MouseEvent, itemSelected: string) => {
    dispatch({
      type: SIDEBAR_SELECT_ITEM,
      payload: itemSelected,
    });
    dispatch({
      type: SELECT_CLASSROOM,
      payload: null,
    });
    if (itemSelected === SidebarItem.Classrooms) {
      setShowItems(!showItems);

      return;
    }
    setSidebarOpen && setSidebarOpen(true);
  };

  const closeSidebarClassroom = (classroomId: string) => {
    dispatch({
      type: SELECT_CLASSROOM,
      payload: classroomId,
    });
    setSidebarOpen && setSidebarOpen(true);
  };

  const showPaintMeApp = () => {
    const myPaintme = document.getElementById("paintme") as HTMLElement;
    myPaintme.classList.toggle("show");
  };

  useEffect(() => {}, [selectedItem, profileImg, uiSelectedClassroom]);

  return (
    <>
      <div className="side-menu">
        <SideBarCard
          firstName={user?.firstName}
          lastName={user?.lastName}
          imgUser={profileImg !== "default" ? profileImg : imgUser}
        />
        <div className="card-menu-items">
          <div className="items-container">
            {/* <SidebarItemSelection
              name="Inicio"
              path="/plataforma"
              img={imgHome}
              style={`item ${selectedItem === SidebarItem.Home && "active"}`}
              click={(e) => handleSelectItem(e, SidebarItem.Home)}
            />
            <div className="item-container">
              <div
                className={`item ${
                  selectedItem === SidebarItem.Classrooms && "active"
                }`}
                onClick={(e) => handleSelectItem(e, SidebarItem.Classrooms)}
              >
                <img src={imgClassroom} alt="" />
                <h5>Mis salones ({classrooms.length})</h5>
              </div>
              <div
                className={`item-details ${
                  selectedItem === SidebarItem.Classrooms
                    ? ""
                    : "dont-show-items"
                }`}
              >
                {classrooms &&
                  classrooms.map((classroom, index) => (
                    <Link
                      to={`/plataforma/salon/${classroom._id}`}
                      onClick={() =>
                        closeSidebarClassroom(classroom._id as string)
                      }
                      className={`sub-item ${
                        uiSelectedClassroom === (classroom._id as string) &&
                        "selected"
                      }`}
                      key={index}
                    >
                      <span className={classroom.color}> </span>
                      <h5>
                        {classroom.course
                          .concat(" - " + classroom.grade + "°")
                          .concat(" " + classroom.section)}
                      </h5>
                    </Link>
                  ))}
              </div>
            </div> */}
            {/* {user?.type === UserType.TEACHER ? (
              <div>
                <div className="item-container">
                  <Link
                    to="/plataforma/ejercicios"
                    className={`item ${
                      selectedItem === SidebarItem.Exercises && "active"
                    }`}
                    onClick={(e) => handleSelectItem(e, SidebarItem.Exercises)}
                  >
                    <img src={imgExercise} alt="" />
                    <h5>Ejercicios</h5>
                  </Link>
                </div>
                <div className="item-container">
                  <Link
                    to="/plataforma/evaluaciones"
                    className={`item ${
                      selectedItem === SidebarItem.Evaluations && "active"
                    }`}
                    onClick={(e) =>
                      handleSelectItem(e, SidebarItem.Evaluations)
                    }
                  >
                    <img src={imgEvaluations} alt="" />
                    <h5>Evaluaciones</h5>
                  </Link>
                </div>
              </div>
            ) : null} */}
            {/* <div className="item-container">
              <Link
                to="/plataforma/ejercicios-arca"
                className={`item ${
                  selectedItem === SidebarItem.ArcaExercises && "active"
                }`}
                onClick={(e) => handleSelectItem(e, SidebarItem.ArcaExercises)}
              >
                <img src={imgTasks} alt="" />
                <h5>Ejercicios Arca</h5>
              </Link>
            </div> */}
            {/* <div className="item-container">
              <Link
                to="/plataforma/mensajes"
                className={`item ${
                  selectedItem === SidebarItem.Messages && "active"
                }`}
                onClick={(e) => handleSelectItem(e, SidebarItem.Messages)}
              >
                <img src={imgMessage} alt="" />
                <h5>Mensajes</h5>
              </Link>
            </div> */}
            <div className="item-container">
              <Link
                to="/plataforma/libros"
                className={`item ${
                  selectedItem === SidebarItem.Books && "active"
                }`}
                onClick={(e) => handleSelectItem(e, SidebarItem.Books)}
              >
                <img src={imgBooks} alt="" />
                <h5>Libros</h5>
              </Link>
            </div>
            {/* <div className="item-container">
              <Link
                to="/plataforma/transmision"
                target="_blank"
                className={`item ${
                  selectedItem === SidebarItem.Broadcast && "active"
                }`}
                onClick={(e) => handleSelectItem(e, SidebarItem.Broadcast)}
              >
                <img src={imgStreamming} alt="" />
                <h5>Transmisión </h5>
              </Link>
            </div> */}
            {/* <div className="item-container painter">
              <div className={`item`} onClick={showPaintMeApp}>
                <img src={imgWhiteboard} alt="" />
                <h5>Pizarra</h5>
              </div>
            </div> */}
          </div>
          <div className="menu-footer">
            {/* <div className="support-cener">
              <a href="mailto:soporteplataforma@arcadepapel.net">
                <h6>Centro de ayuda</h6>
              </a>
            </div> */}
            <div className="social-networking-sites">
              <a
                href="https://www.facebook.com/editorialarcadepapel/"
                target="_blank"
              >
                <img src={imgFacebook} alt="" />
              </a>
              <a href="https://twitter.com/arcadepapeleir" target="_blank">
                <img src={imgTwitter} alt="" />
              </a>
              <a href="https://www.instagram.com/arca.de.papel" target="_blank">
                <img src={imgInstagram} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
