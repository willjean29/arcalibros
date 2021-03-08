import React from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";
//REDUX

const SchoolLogo = () => {
  const imagenDefault =
    "https://arcadepapel.net/assets/images/logo.png";
  const schoolLogo = useSelector(
    (state: RootStore) => state.user.user?.school.insigne
  );

  return (
    <div className="school-logo">
      {/* <img src={!imagenColegio.trim() ? imagenDefault : imagenColegio} width="200" height="200" alt=""/> */}
      <img src={schoolLogo === "default" ? imagenDefault : schoolLogo} width="200" height="200" alt="" />
    </div>
  );
};

export default SchoolLogo;

// @media screen and (max-width: 768px) {
//     .card-create-room {
//       padding: 15px 20px;
//       height: auto;
//     }
//     .card-create-room .image img{
//       width: 80%;
//     }
//     .info-create-room-card{
//       margin-left: 5px;
//     }
//     .info-create-room-card h2 {
//       display: none;
//       /* font-size: 1.2em; */
//     }
//     .info-create-room-card p {
//       /* display: none; */
//       font-size: .9em;
//     }
//     .info-create-room-card button{
//       font-size: 1em;
//       width: 130px;
//       padding: 10px;
//     }
//     .two-components-logo{
//       grid-template-columns: 1fr 150px;
//     }
//     .school-logo{
//       width: 100%;
//       height: 100%;
//     }
//     .school-logo img{
//       width: 90%;
//       height: 90%;
//       object-fit: contain;
//     }

//   }
//   @media screen and (max-width: 620px) {

//   }
