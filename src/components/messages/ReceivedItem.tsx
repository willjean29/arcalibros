import React, { MouseEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Message } from "../../store/messaging/interfaces/message.interface";
import imgAttach from "../../assets/icons/attach-file.png";
import { messageSetRead } from "../../store/messaging/messaging.actions";
interface IProps {
  message: Message;
}
const ReceivedItem: React.FC<IProps> = ({ message }) => {
  const showFirstLetter = () => {
    let firstLetter = message.sender.toUpperCase();
    return firstLetter.charAt(0);
  };

  return (
    <Link to={`/plataforma/mensajes/${message._id}`}>
      <div className={message.read ? "received-item" : "received-item new"}>
        <div>
          <div className="nameInitial">{showFirstLetter()}</div>
        </div>
        <div>
          <h6 className="receptor">De: {message.sender}</h6>
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

export default ReceivedItem;
