import React, { useState, Fragment, FormEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { RootStore } from "../../store/store";
import { TeacherRegisterDto } from "../../store/user/dtos/register-teacher.dto";
import moment from "moment";
import { registerTeacher } from "../../store/user/user.actions";
import {
  TEACHER_REGISTER,
  TEACHER_REGISTER_ERROR,
  usersURL,
  USER_REGISTER_DONE,
} from "../../store/user/user.types";
import { UserType } from "../../utils/enums";
import axios, { AxiosError } from "axios";
import AutoSuggestSchools from "../autosuggest/AutoSuggestSchools";
import { School } from "../../store/user/interfaces/school.interface";
import { toast } from "react-toastify";
import ReactDatePicker from "react-datepicker";

const RegistroDocente = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [registerCode, setRegisterCode] = useState("");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [levels, setLevels] = useState([] as string[]);
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
    setDni("");
    setFirstName("");
    setLastName("");
    setLevels([] as string[]);
    setPassword("");
    setPasswordConfirm("");
    setRegisterCode("");
  };
  const handleLevelSelection = (e: any) => {
    if (e.target.checked) {
      setLevels([...levels, e.target.value]);
    } else {
      const fillterArray = levels.filter((item) => item !== e.target.value);
      setLevels(fillterArray);
    }
  };

  const handleStartDate = (date: any) => {
    setStartDate(date);
  };
  const handleTeacherRegister = (e: FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setNoErrors(["Las contraseñas no coinciden"]);
      return;
    }
    if (levels.length === 0) {
      setNoErrors(["Seleccione niveles"]);
      return;
    }
    const teacher: TeacherRegisterDto = {
      classrooms: [] as string[],
      dni,
      email,
      firstName,
      lastName,
      password,
      type: UserType.TEACHER,
      levels,
      registerCode,
      schoolName: "default",
      birthday: moment(startDate).format("MM/DD/YYYY"),
    };
    registerTeacher(teacher);
  };
  const registerTeacher = async (teacher: TeacherRegisterDto) => {
    try {
      const res = await axios.post(
        usersURL.concat("register/teacher"),
        teacher
      );
      if (res.data.user) {
        setNoErrors(null);
        dispatch({
          type: TEACHER_REGISTER,
          payload: { registerTeacherErrors: undefined },
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
      <form className="registro-form" onSubmit={handleTeacherRegister}>
        {errors && (
          <div className="alert-error">
            {typeof errors === "string"
              ? "Email de usuario ya existe"
              : errors[0]}
            <button onClick={() => setNoErrors(false)}>
              <i className="fa fa-times">X</i>
            </button>
          </div>
        )}

        <div className="form-group">
          <input
            type="text"
            className=""
            placeholder="Código de registro"
            onChange={(e) => setRegisterCode(e.target.value)}
            value={registerCode}
          />
          <i className="fa fa-code"></i>
        </div>
        <div className="form-group">
          <input
            type="email"
            className=""
            placeholder="Email (usuario)"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <i className="fa fa-at"></i>
        </div>
        <div className="form-group">
          <input
            type="text"
            className=""
            placeholder="Nombres"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <i className="fa fa-user"></i>
        </div>
        <div className="form-group">
          <input
            type="text"
            className=""
            placeholder="Apellidos"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <i className="fa fa-user"></i>
        </div>
        <div className="form-group">
          {/* <label htmlFor="">Fecha de nacimiento</label> */}
          <ReactDatePicker
            placeholderText="Fecha de nacimiento"
            selected={startDate}
            dateFormat={"dd/MM/yyyy"}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            onChange={(date) => handleStartDate(date)}
            isClearable={true}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className=""
            placeholder="DNI"
            inputMode="numeric"
            onChange={(e) => setDni(e.target.value)}
            value={dni}
          />
          <i className="fa fa-user"></i>
        </div>
        <div className="form-group">
          <input
            type="password"
            className=""
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <i className="fa fa-lock"></i>
        </div>
        <div className="form-group">
          <input
            type="password"
            className=""
            placeholder="Repita la contraseña"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
          <i className="fa fa-lock"></i>
        </div>

        <div className="checkboxes">
          <div className="custom-sq">
            <input
              type="checkbox"
              value="Inicial"
              name="seleccion"
              id="box1"
              onChange={handleLevelSelection}
            />
            <label htmlFor="box1">Inicial</label>
          </div>
          <div className="custom-sq">
            <input
              type="checkbox"
              value="Primaria"
              name="seleccion"
              id="box2"
              onChange={handleLevelSelection}
            />
            <label htmlFor="box2">Primaria</label>
          </div>
          <div className="custom-sq">
            <input
              type="checkbox"
              value="Secundaria"
              name="seleccion"
              id="box3"
              onChange={handleLevelSelection}
            />
            <label htmlFor="box3">Secundaria</label>
          </div>
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

export default RegistroDocente;
