import { AxiosError } from "axios";
import React, { useState, Fragment, useEffect, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, withRouter } from "react-router-dom";
import moment from "moment";
import { StudentRegisterDto } from "../../store/user/dtos/register-student.dto";

import {
  STUDENT_REGISTER,
  STUDENT_REGISTER_ERROR,
  usersURL,
} from "../../store/user/user.types";
import { UserType } from "../../utils/enums";
import axios from "axios";
import { School } from "../../store/user/interfaces/school.interface";
import AutoSuggestSchools from "../autosuggest/AutoSuggestSchools";
import { toast } from "react-toastify";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

const RegistroAlumno = (): JSX.Element => {
  registerLocale("es", es);
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [registerCode, setRegisterCode] = useState("");

  const [parentEmail, setParentEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setNoErrors] = useState<any>(false);
  const [startDate, setStartDate] = useState<any>(null);
  useEffect(() => {
    if (errors === null) {
      clearFields();
      toast.success("Registro realizado con éxito");
      history.push("/");
    }
  }, [errors]);

  const clearFields = () => {
    setEmail("");
    setParentEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");

    setPasswordConfirm("");
    setRegisterCode("");
  };

  const handleStudentRegister = (e: FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setNoErrors(["Las contraseñas no coinciden"]);
      return;
    }

    const student: StudentRegisterDto = {
      classrooms: [] as string[],
      email,
      firstName,
      lastName,
      password,
      type: UserType.STUDENT,
      parentEmail,
      registerCode,
      schoolName: "default",
      birthday: moment(startDate).format("MM/DD/YYYY"),
    };
    registerStudent(student);
  };
  const handleStartDate = (date: any) => {
    setStartDate(date);
  };
  const registerStudent = async (student: StudentRegisterDto) => {
    try {
      const res = await axios.post(
        usersURL.concat("register/student"),
        student
      );

      if (res.data.user) {
        setNoErrors(null);
        dispatch({
          type: STUDENT_REGISTER,
          payload: { registerStudentErrors: undefined },
        });
      } else {
        setNoErrors(["Error al registrar"]);
      }
    } catch (error) {
      const errorAxios: AxiosError = error;

      setNoErrors(errorAxios.response?.data.message);
    }
  };
  return (
    <Fragment>
      <form
        className="registro-form"
        autoComplete="false"
        onSubmit={handleStudentRegister}
      >
        {errors && (
          <div className="alert-error">
            {typeof errors === "string"
              ? "Email de usuario o padre ya existe"
              : errors[0]}
            <button onClick={() => setNoErrors(false)}>
              <i className="fa fa-times">X</i>
            </button>
          </div>
        )}
        <div className="form-group">
          {/* <label htmlFor="">Código de registro</label> */}
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Código de registro"
            onChange={(e) => setRegisterCode(e.target.value)}
            value={registerCode}
          />
          <i className="fa fa-lock"></i>
        </div>
        <div className="form-group">
          {/* <label htmlFor="">Correo</label> */}
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Ingresar correo"
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="fa fa-at"></i>
        </div>
        <div className="form-group">
          {/* <label htmlFor="">Nombres</label> */}
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Ingresar nombres"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <i className="fa fa-user"></i>
        </div>
        <div className="form-group">
          {/* <label htmlFor="">Apellidos</label> */}
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Ingresar apellidos"
            onChange={(e) => setLastName(e.target.value)}
          />
          <i className="fa fa-user"></i>
        </div>
        <div className="form-group">
          {/* <label htmlFor="">Fecha de nacimiento</label> */}
          <DatePicker
            locale="es"
            selected={startDate}
            dateFormat={"dd/MM/yyyy"}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            onChange={(date) => handleStartDate(date)}
            isClearable={true}
            placeholderText="Fecha de nacimiento"
          />
        </div>

        <div className="form-group">
          {/* <label htmlFor="">Contraseña</label> */}
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Ingresar contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="fa fa-lock"></i>
        </div>
        <div className="form-group">
          {/* <label htmlFor="">Repetir contraseña</label> */}
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Repita la contraseña"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <i className="fa fa-lock"></i>
        </div>
        <div className="form-group">
          {/* <label htmlFor="">Correo del padre</label> */}
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email del padre o tutor"
            onChange={(e) => setParentEmail(e.target.value)}
          />
          <i className="fa fa-at"></i>
        </div>
        <button className="btn-register" type="submit">
          Registrarse
        </button>
      </form>
      <small className="no-account">¿Tienes una cuenta?</small>
      <Link to="/" className="create-account">
        Iniciar sesión
      </Link>
    </Fragment>
  );
};

export default withRouter(RegistroAlumno);
