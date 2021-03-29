import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import imgLogo from "../../assets/images/logo1.png";
import imgClose from "../../assets/images/btn-close.png";
import AutoSuggestSchools from "../autosuggest/AutoSuggestSchools";
import { RootStore } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { usersURL } from "../../store/user/user.types";
import { toast } from "react-toastify";
import { changeSchool } from "../../store/user/user.actions";
import SchoolDetail from "../school-detail/SchoolDetail";
import { School } from "../../store/user/interfaces/school.interface";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalSelectSchool: React.FC<Props> = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  let [schoolSelected, setSchoolSelected] = useState({} as School);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [departament, setDepartament] = useState("");
  const [dni, setDni] = useState("");
  const [startDate, setStartDate] = useState<any>(null);
  const [schoolName, setSchoolName] = useState("");
  const user = useSelector((state: RootStore) => state.user.user);
  const handleSchoolSelection = (
    event: React.ChangeEvent<{}>,
    value: School | null
  ) => {
    event.preventDefault();
    if (value !== null) {
      setSchoolSelected(value);
    }
    setSchoolName(value?.name as string);
  };

  const handleEditUserSchool = async (e: FormEvent) => {
    e.preventDefault();
    // setModalOpen(false);
    // return;
    const updateUserDto = {
      userId: user?._id as string,
      firstName,
      lastName,
      dni,
      emailUser: email,
      phone,
      departament,
      schoolName,
      userType: user?.type as number,
      birthday: moment(startDate).format("MM/DD/YYYY"),
    };

    console.log(updateUserDto);
    // return;
    try {
      const res = await axios.put(usersURL.concat("update"),updateUserDto);
      if(res.data.user){
        dispatch(changeSchool(res.data.user));
        toast.success("Usuario actualizado con éxito");
        setModalOpen(false);
      }
      // console.log(res);
    } catch (error) {
      toast.error("Error al actualizar usuario");
      console.log(error);
    }
    // try {
    //   const res = await axios.post(
    //     usersURL.concat("change-school"),
    //     changeSchoolDto
    //   );
    //   if (res.data.user) {
    //     dispatch(changeSchool(res.data.user));
    //     toast.success("Salón cambiado con éxito");
    //     setModalOpen(false);
    //   }
    // } catch (error) {
    //   toast.error("Seleccione un salón");
    //   console.log(error);
    // }
  };
  return (
    <>
      <div className="modverlay" />
      <div className="card-modal-general school">
        <img width="200px" src={imgLogo} alt="" />
        <h3 className="welcometo school">
          Actualize sus datos para continuar
        </h3>
        <p>Complete los campos requeridos</p>
        <form className="form-select-school" onSubmit={handleEditUserSchool}>
          <div className="form-group" style={{width: "100%"}}>
            <input
              type="text"
              className=""
              placeholder="Nombres"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <i className="fa fa-user"></i>
          </div>
          <div className="form-group" style={{width: "100%"}}>
            <input
              type="text"
              className=""
              placeholder="Apellidos"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <i className="fa fa-user"></i>
          </div>
          <div className="form-group" style={{width: "100%"}}>
            <ReactDatePicker
              placeholderText="Fecha de nacimiento"
              selected={startDate}
              dateFormat={"dd/MM/yyyy"}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              onChange={(date) => setStartDate(date)}
              isClearable={true}
            />
          </div>
          <div className="form-group" style={{width: "100%"}}>
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
          <div className="form-group" style={{width: "100%"}}>
            <input
              type="email"
              className=""
              placeholder="Correo Electrónico"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <i className="fa fa-user"></i>
          </div>
          <div className="form-group" style={{width: "100%"}}>
            <input
              type="text"
              className=""
              placeholder="Celular"
              inputMode="numeric"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <i className="fa fa-user"></i>
          </div>
          <div className="form-group" style={{width: "100%"}}>
            <input
              type="text"
              className=""
              placeholder="Departamento"
              onChange={(e) => setDepartament(e.target.value)}
              value={departament}
            />
            <i className="fa fa-user"></i>
          </div>
          <div className="form-group" style={{width: "100%"}}>
            <input
              type="text"
              className=""
              placeholder="Ingresar Colegio"
              onChange={(e) => setSchoolName(e.target.value)}
              value={schoolName}
            />
            <i className="fa fa-user"></i>
          </div>
          {/* <AutoSuggestSchools onChangeInput={handleSchoolSelection} />
          {Object.keys(schoolSelected).length > 0 && (
            <SchoolDetail school={schoolSelected} />
          )} */}
          <button className="btn-modal large" type="submit">
            Actualizar Datos
          </button>
        </form>
      </div>
    </>
  );
};

export default ModalSelectSchool;