import React, {
  useState,
  useRef,
  FormEvent,
  MouseEvent,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

import userImage from "../assets/images/user-color.png";
import LoginError from "../components/login/LoginError";
import LoginNav from "../components/login/LoginNav";
import UserImg from "../components/login/UserImg";
import imgBg from "../assets/images/bg-one.png";
import imgBg2 from "../assets/images/bg-two.png";
import imgBg3 from "../assets/images/bg-three.png";
import Modal from "../components/modal/Modal";
import ModalRecoverPassword from "../components/modal/ModalRecoverPassword";
import { loadClassrooms } from "../store/classroom/classroom.actions";
import { RootStore } from "../store/store";
import { loginUser } from "../store/user/user.actions";
import { USER_LOGIN_ERROR } from "../store/user/user.types";
import ModalInformation from "../components/modal/ModalInformation";


const LoginPage = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginError = useSelector((state: RootStore) => state.user.loginError);
  const user = useSelector((state: RootStore) => state.user.user);
  const [modalOpenRecover, setModalOpenRecover] = useState(false);
  const [showInfo, setShowInfo] = useState(true)
  // const [currentImg, setCurrentImg] = useState(0);

  const openModalRecover = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalOpenRecover(true);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let newEmail = `${email}@gmail.com`;
    const loginDto = {
      email: newEmail,
      password,
    };
    dispatch(loginUser(loginDto));
  };
  useEffect(() => {
    if (user) {
      history.push("/plataforma/libros");
      dispatch(loadClassrooms());
      //load messages numero de no leidos en sidebar
      dispatch({ type: USER_LOGIN_ERROR, payload: null });
    }
  }, [loginError, user]);
  useEffect(() => {
    dispatch({ type: USER_LOGIN_ERROR, payload: null });
  }, [location]);

  // let bgCounter = 0;
  // let bg = document.querySelector(".auth-bg");
  // let images = [imgBg2, imgBg3, imgBg];
  // setTimeout(() => {
    // console.log(bg?.getAttribute("src"))
    // bg?.setAttribute("src", `${images[bgCounter]}`);
    // bgCounter = bgCounter + 1;
  //   setCurrentImg(currentImg + 1);
  //   if (currentImg === 2) {
  //     setCurrentImg(0);
  //   }
  // }, 5000);
  

  return (
    <section className="login-section">
      {/* <Modal modalOpen={showInfo}>
        <ModalInformation setModalOpen={setShowInfo} />
      </Modal> */}
      <nav>
        <LoginNav />
      </nav>
      <div className="image-lateral">
        <img className="auth-bg" src={imgBg2} alt="" />
      </div>
      <div className="login-container">
        <div className="login-form-container">
          <div className="image-user">
            <UserImg userImage={userImage} />
          </div>
          <form onSubmit={handleLogin}>
            <div className="alert alert-danger">
              {loginError && <LoginError loginError={loginError[0]} />}
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Usuario"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <i className="fa fa-user"></i>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control mb-2"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <i className="fa fa-lock"></i>
            </div>
            {/* <a href="#" className="remenber-me">Recordar contraseña</a> */}

            <div className="form-login">
              <button className="btn-login" type="submit">
                Iniciar sesión
              </button>
              {/* <button
                className="btn-recover-password"
                onClick={(e) => openModalRecover(e)}
              >
                ¿Contraseña olvidada?
              </button> */}
            </div>
            {/* <Modal modalOpen={modalOpenRecover}>
              <ModalRecoverPassword setModalOpen={setModalOpenRecover} />
            </Modal> */}
            {/* <small className="no-account">¿Aún no tienes cuenta?</small>
            <Link to="/registro" className="create-account">
              Crear cuenta
            </Link> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
