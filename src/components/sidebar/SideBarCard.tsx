import React from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import { UserType } from "../../utils/enums";
interface IProps {
  imgUser: string;
  firstName: string | undefined;
  lastName: string | undefined;
}
const SideBarCard: React.FC<IProps> = ({ imgUser, firstName, lastName }) => {
  const userType = useSelector(
    (state: RootStore) => state.user.user?.type as number
  );
  const email = useSelector(
    (state: RootStore) => state.user.user?.email as string
  );
  return (
    <div className="card-menu">
      <div className="profile-image">
        <img src={imgUser} alt="" />
      </div>
      <div className="user-info">
        <h3 title={`${firstName} ${lastName}`}>
          {firstName} {lastName}
        </h3>
        <small>{userType === UserType.TEACHER ? "Profesor" : "Alumno"}</small>
        <small title={email}>{email}</small>
      </div>
    </div>
  );
};

export default SideBarCard;
