import React from "react";
import { Link } from "react-router-dom";
import { Message } from "../../store/messaging/interfaces/message.interface";

import imgAttach from "../../assets/icons/attach-file.png";
interface IProps {
  message: Message;
}
const SendedItem: React.FC<IProps> = ({ message }) => {
  const showFirstLetter = () => {
    let firstLetter = message.sender.toUpperCase();
    return firstLetter.charAt(0);
  };

  return (
    <Link to={`/plataforma/mensajes/${message._id}`}>
      <div className="received-item">
        <div>
          <div className="nameInitial">{showFirstLetter()}</div>
        </div>
        <div>
          <h6 className="receptor">Para: {message.receptor}</h6>
          <h4 className="subject">{message.subject}</h4>
          <p className="email-message">
            {message.messageText.replace(/<\/?[^>]+(>|$)/g, "")}
          </p>
          <p>
            {message.file && (
              <span className="attach-icon">
                <img src={imgAttach} alt="" />
                <small>Documento adjunto</small>
              </span>
            )}
          </p>
        </div>
        <small className="date">{message.date}</small>
      </div>
      <hr />
    </Link>
  );
};

export default SendedItem;
