import React, { Dispatch, MouseEvent, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootStore } from "../../store/store";
import { USER_LOGOUT } from "../../store/user/user.types";
import { SocketEvent, UserType } from "../../utils/enums";

import imgUser from "../../assets/images/user.png";
import imgSettings from "../../assets/icons/settings.svg";
import imgSupport from "../../assets/icons/support.svg";
import imgLogOut from "../../assets/icons/logout.svg";
import imgHelpUs from "../../assets/icons/helpus.svg";
import imgArrowRight from "../../assets/icons/arrow-right.svg";
import { socket } from "../../utils/sockets";
import { Student } from "../../store/user/interfaces/student.interface";
import { Teacher } from "../../store/user/interfaces/teacher.interface";


interface Props {
  setDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

const UserDropdown: React.FC<Props> = ({setDropdownOpen}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStore) => state.user.user) as
    | Teacher
    | Student;
  const profileImg = useSelector(
    (state: RootStore) => state.user.profileImg
  ) as string;
  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: USER_LOGOUT,
    });
    socket.users.emit(SocketEvent.UserDisconnect, user._id);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  }

  return (
    <div className="drop-down-user">
      <div className="dw-user-profile">
        <div className="image">
          <img src={profileImg !== "default" ? profileImg : imgUser} alt="" />
        </div>
        <div className="dw-user-info">
          <a className="name-user strong">
            {user?.firstName.concat(" " + user?.lastName)}
          </a>
          <a className="type-user">
            {user?.type === UserType.TEACHER ? "Profesor" : "Estudiante"}
          </a>
        </div>
      </div>
      <hr />
      <a
        href="mailto:soporteplataforma@arcadepapel.net"
        onClick={closeDropdown}
        className="dw-item border-top color-light-grey"
      >
        <div className="right-dropdown">
          <div className="circle-container">
            <img src={imgHelpUs} alt="" />
          </div>
          <div className="text-dropdown">
            <h3 className="title">Enviar comentarios</h3>
            <p className="helpUs">
              Ayúdanos a mejorar la nueva versión de Arca virtual.
            </p>
          </div>
        </div>
      </a>
      <hr />
      <Link
        to="/plataforma/ajustes"
        onClick={closeDropdown}
        className="dw-item border-top color-light-grey"
      >
        <div className="right-dropdown">
          <div className="circle-container">
            <img src={imgSettings} alt="" />
          </div>
          <div className="text-dropdown">
            <h3 className="title">Ajustes</h3>
          </div>
        </div>
        <div className="circle-container">
          <img src={imgArrowRight} alt="" />
        </div>
      </Link>
      <a
        href="mailto:soporteplataforma@arcadepapel.net"
        onClick={closeDropdown}
        className="dw-item border-top color-light-grey"
      >
        <div className="right-dropdown">
          <div className="circle-container">
            <img src={imgSupport} alt="" />
          </div>
          <div className="text-dropdown">
            <h3 className="title">Soporte</h3>
          </div>
        </div>
        <div className="circle-container">
          <img src={imgArrowRight} alt="" />
        </div>
      </a>
      <Link
        to="/"
        onClick={handleLogout}
        className="dw-item border-top color-light-grey"
      >
        <div className="right-dropdown">
          <div className="circle-container">
            <img src={imgLogOut} alt="" />
          </div>
          <div className="text-dropdown">
            <h3 className="title">Cerrar sesión</h3>
          </div>
        </div>
        <div className="circle-container">
          <img src={imgArrowRight} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default UserDropdown;
