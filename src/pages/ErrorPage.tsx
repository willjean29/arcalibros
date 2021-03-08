import React from "react";
import { Link } from "react-router-dom";

import imgPencil from "../assets/images/broken-pencil.png";

const ErrorPage = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="not-found-container">
          <h1>404</h1>
          <h2>ERROR</h2>
          <h3>PÁGINA NO ENCONTRADA</h3>
          <img src={imgPencil} alt="" />
          <Link to="/">¡ACTUALIZAR O IR A LA PÁGINA PRINCIPAL!</Link>
        </div>
        <div className="bar-one"></div>
        <div className="bar-two"></div>
      </div>
    </div>
  );
};

export default ErrorPage;
