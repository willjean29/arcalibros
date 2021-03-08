import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import imgLogo from "../../assets/images/logo.png";
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
interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalSelectSchool: React.FC<Props> = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  let [schoolSelected, setSchoolSelected] = useState({} as School);

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
    const changeSchoolDto = {
      userId: user?._id as string,
      schoolName,
      userType: user?.type as number,
    };
    try {
      const res = await axios.post(
        usersURL.concat("change-school"),
        changeSchoolDto
      );
      if (res.data.user) {
        dispatch(changeSchool(res.data.user));
        toast.success("Salón cambiado con éxito");
        setModalOpen(false);
      }
    } catch (error) {
      toast.error("Seleccione un salón");
      console.log(error);
    }
  };
  return (
    <>
      <div className="modverlay" />
      <div className="card-modal-general school">
        <img width="200px" src={imgLogo} alt="" />
        <h3 className="welcometo school">
          Elija a que colegio pertenece para continuar
        </h3>
        <p>A continuación busque su colegio digitándolo</p>
        <form className="form-select-school" onSubmit={handleEditUserSchool}>
          <AutoSuggestSchools onChangeInput={handleSchoolSelection} />
          {Object.keys(schoolSelected).length > 0 && (
            <SchoolDetail school={schoolSelected} />
          )}
          <button className="btn-modal large" type="submit">
            Seleccionar colegio
          </button>
        </form>
      </div>
    </>
  );
};

export default ModalSelectSchool;
