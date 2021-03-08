import React from "react";

import imgRedact from "../../assets/icons/redact.png";
interface IProps {
  handleRedact: () => void;
}
const ButtonRedactEmail: React.FC<IProps> = ({ handleRedact }) => {
  return (
    <div className="main-button-send-email">
      <div className="btn-send" onClick={handleRedact}>
        <img src={imgRedact} alt="" />
        Redactar
      </div>
    </div>
  );
};

export default ButtonRedactEmail;
