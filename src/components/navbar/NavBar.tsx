import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { RootStore } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

import UserDropdownTools from "../dropdown/UserDropdown";
import SideBar from "../sidebar/SideBar";

import imgUser from "../../assets/images/user.png";
import logoArca from "../../assets/images/logo.png";
import imgMenu from "../../assets/icons/menu.svg";
import imgChat from "../../assets/icons/chat.svg";
import imgDropDownArrow from "../../assets/icons/arrow-dropdown.svg";
import { usersURL } from "../../store/user/user.types";
import { socket } from "../../utils/sockets";
import { SocketEvent } from "../../utils/enums";
import { setClock } from "../../store/ui/ui.actions";

const NavBar = () => {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState("dont-show-dropdown");
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state: RootStore) => state.user.user);
  const clock = useSelector((state: RootStore) => state.ui.clock);
  const profileImg = useSelector(
    (state: RootStore) => state.user.profileImg
  ) as string;
  const [menu, setMenu] = useState(true);

  const changeStateDropdown = (dropdownData: any) => {
    setShowDropdown(dropdownData);
    setMenu(true);
    if (dropdownData) {
      setDropdown("");
    } else {
      setDropdown("dont-show-dropdown");
    }
  };
  const dontShowDropdown = () => {
    setDropdown("dont-show-dropdown");
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {}, [profileImg]);
  useEffect(() => {
    socket.users.on(SocketEvent.ClockFromServer, (clock: string) => {
      dispatch(setClock(clock));
    });
  }, []);

  const setDay = () => {
    let myDate = clock.split(",")[0];
    let myDateArray: [] | any = myDate.split(" ");
    return myDateArray[1];
  };
  const setMonth = () => {
    let myDate = clock.split(",")[0];
    let myDateArray: [] | any = myDate.split(" ");
    let month = myDateArray[0].substring(0, 6);
    return month + ".";
  };

  const setHour = () => {
    let myHour = clock.split(",")[1];
    return myHour;
  };

  return (
    <>
      <nav className="nav-home">
        <div className="right-content">
          <button id="btnMenu" onClick={() => setMenu(!menu)}>
            <img src={imgMenu} alt="" />
          </button>
          <div className="companyName" onClick={() => setMenu(true)}>
            <Link to="/plataforma">
              <img className="navImg" src={logoArca} alt=""></img>
            </Link>
          </div>
        </div>
        <button className="left-content">
         {/* <div className="btn-profile-user">
            <div className="profile-image">
              <img
                src={profileImg !== "default" ? profileImg : imgUser}
                alt=""
                height="300px"
                width="300px"
              ></img>
            </div>
            <h6>{user?.firstName.concat(" " + user.lastName)}</h6>
          </div>

           <div className="myDateTime">
            <div className="date">
              <h3>{setDay()}</h3>
              <h3 className="month">{setMonth()}</h3>
            </div>
            <h3>{setHour()}</h3>
          </div> */}

          <div
            className="btn-dropdown"
            onClick={() => changeStateDropdown(!showDropdown)}
          >
            <img src={imgDropDownArrow} alt="" />
          </div>
          <div className={dropdown} onMouseLeave={() => dontShowDropdown()}>
            <UserDropdownTools setDropdownOpen={changeStateDropdown} />
          </div> 
        </button>
      </nav>

      {/* <div
        className={
          menu === true
            ? "sidebar-responsive-ang"
            : "sidebar-responsive-ang show"
        }
      >
        <div className="menu-overlay" onClick={() => setMenu(!menu)} />
        <SideBar setSidebarOpen={setMenu} />
      </div> */}
    </>
  );
};

export default NavBar;
