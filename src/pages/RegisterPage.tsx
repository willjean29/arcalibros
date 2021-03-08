import React, { useState } from "react";

import RegisterStudent from "../components/register/RegisterStudent";
import RegisterTeacher from "../components/register/RegisterTeacher";
import userImage from "../assets/images/user-color.png";
import imgBg from "../assets/images/bg-three.png";
import RegisterNav from "../components/register/RegisterNav";
import { UserType } from "../utils/enums";

const RegisterPage = () => {
  const [type, setType] = useState(UserType.STUDENT);
  return (
    <section className="register-section">
      <RegisterNav />
      <div className="image-lateral">
        <img className="auth-bg " src={imgBg} alt="" />
      </div>
      <div className="register-container">
        <div className="form-container">
          <h3 className="title-type-user">
            {type === UserType.TEACHER ? "Registro Docente" : "Registro Alumno"}
          </h3>
          <div className="image-user">
            <img src={userImage} alt="" />
          </div>
          <div className="change-user">
            <button
              onClick={() => setType(UserType.TEACHER)}
              className={type === UserType.TEACHER ? "active" : ""}
            >
              Profesor
              <i className="fa fa-users"></i>
            </button>
            <button
              onClick={() => setType(UserType.STUDENT)}
              className={type === UserType.STUDENT ? "active" : ""}
            >
              Alumno
              <i className="fa fa-graduation-cap"></i>
            </button>
          </div>
          {type === UserType.TEACHER ? (
            <RegisterTeacher />
          ) : (
            <RegisterStudent />
          )}
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
