import React from "react";
import { Link } from "react-router-dom";

import imgResource from '../../assets/images/myresources.png';

const RemoteClass = () => {
  
  return (
    <Link to="/plataforma/transmision" target="_blank" className="card-remote">
      <div className="card-remote-container">
        <div className="detail">
          <h4>¿Enseñas de manera remota?</h4>
          <p>¡Arca de papel te ayuda brindandote herramientas!</p>
        </div>
        <div className="image">
          <img src={imgResource} alt="" />
        </div>
      </div>
    </Link>
  );
};

export default RemoteClass;
