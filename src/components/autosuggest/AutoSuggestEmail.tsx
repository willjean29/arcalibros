import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";

interface IProps {
  onChangeInput: (event: React.ChangeEvent<{}>, value: any) => void;
  actualValue: string;
}
const AutoSuggestEmail: React.FC<IProps> = ({ onChangeInput, actualValue }) => {
  const [users, setUsers] = useState([] as string[]);
  const schoolName = useSelector(
    (state: RootStore) => state.user.user?.school.name as string
  );
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get(`https://meet.arcavirtual.net/users/${schoolName}`);

      setUsers(res.data.users);
    } catch (error) {
      setUsers([] as string[]);
    }
  };
  return (
    <Autocomplete
      id="combo-box-demo"
      onChange={onChangeInput}
      options={users}
      getOptionLabel={(option: any) => option.name}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <input type="text" {...params.inputProps} value={actualValue} />
        </div>
      )}
    />
  );
};

export default AutoSuggestEmail;
