import React from "react";
import { School } from "../../store/user/interfaces/school.interface";
interface ISchoolDetail {
  school: School;
}
const SchoolDetail: React.FC<ISchoolDetail> = ({ school }) => {
  return school ? (
    <div className="school-detail">
      <div className="image">
        {school && <img src={school.insigne} alt="" />}
      </div>
      <div className="content">
        {school && (
          <>
            <h3>{school.name}</h3>
            <h5>{school.district}</h5>
            <h4>{school.province}</h4>
          </>
        )}
      </div>
    </div>
  ) : (
    <p>Seleccione un colegio {school}</p>
  );
};

export default SchoolDetail;
