import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { School } from "../../store/user/interfaces/school.interface";

interface IProps {
  onChangeInput: (event: React.ChangeEvent<{}>, value: School | null) => void;
}
const AutoSuggestSchools: React.FC<IProps> = ({ onChangeInput }) => {
  let [schools, setSchools] = useState([] as School[]);

  useEffect(() => {
    loadSchools();
  }, []);



  const loadSchools = async () => {
    try {
      const res = await axios.get("http://localhost:4000/users/schools/");
      const filteredSchools = res.data.schools.filter(
        (school: School) => school.name !== "default"
      );
      setSchools(filteredSchools);
    } catch (error) {
      setSchools([] as School[]);
    }
  };
  return (
    <>
    <Autocomplete
      id="combo-box-demo"
      disablePortal={true}
      onChange={onChangeInput}
      options={schools}
      size="medium"
      getOptionLabel={(option: School) => option.name}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <input
            type="text"
            placeholder="Ingresar colegio"
            autoComplete="off"
            {...params.inputProps}
          />
        </div>
      )}
    />
    </>
  );
};

export default AutoSuggestSchools;
