import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IProps {
  examClassroomName: string;
}

const NavbarEvaluationDetail: React.FC<IProps> = ({ examClassroomName }) => {
  // const handleDate = (e: any) => {
  //   console.log(e.target.value)
  //   console.log(typeof(e.target.value))
  // }

  return (
    <div className="navbar-evaluation-detail">
      <div className="navbar-detail">
        <h2>{examClassroomName}</h2>
        {/* 
            <button className="btn-start">Empezar</button> */}
      </div>

      {/* <div className="date-detail">
              <div className="form-group">
                <label htmlFor="">Fecha de inicio</label>
                <input type="date" required pattern="\d{2}-\m{2}-\y{4}" name="" id="" onChange={e => handleDate(e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="">Fecha de entrega</label>
                <input type="date" name="" id=""/>
              </div>
            </div> */}
    </div>
  );
};

export default NavbarEvaluationDetail;
