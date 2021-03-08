import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

import imgBack from "../../assets/icons/back-to.png";
import imgReply from "../../assets/icons/reply-arrow.png";
import imgZipRar from "../../assets/icons/ziprar.png";
import imgDoc from "../../assets/icons/doc.png";
import imgPpt from "../../assets/icons/ppt.png";
import imgExcel from "../../assets/icons/excel.png";
import imgPdf from "../../assets/icons/pdf.png";
import imgText from "../../assets/icons/text.png";
import imgImage from "../../assets/icons/image.png";
import imgVideo from "../../assets/icons/video.png";

import { Message } from "../../store/messaging/interfaces/message.interface";
import {
  loadMessage,
  messageSetRead,
} from "../../store/messaging/messaging.actions";
import { RootStore } from "../../store/store";
import Modal from "../modal/Modal";
import ModalRedactEmail from "../modal/ModalRedactEmail";

const EmailDetailed = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const param: any = useParams();
  const [modalRedactEmail, setModalRedactEmail] = useState(false);
  const message = useSelector(
    (state: RootStore) => state.messaging.individualMessage
  ) as Message;
  const userEmail = useSelector(
    (state: RootStore) => state.user.user?.email
  ) as string;
  useEffect(() => {
    dispatch(loadMessage(param.id));
  }, [location]);
  useEffect(() => {
    dispatch(messageSetRead(param.id));
  }, [location]);

  const showFirstLetter = () => {
    let firstLetter = message.sender.toUpperCase();
    return firstLetter.charAt(0);
  };

  return (
    <div className="quiz-editor">
      {message && (
        <div>
          <Modal modalOpen={modalRedactEmail}>
            <ModalRedactEmail setModalOpen={setModalRedactEmail} />
          </Modal>
          <div className="messages-page">
            <div className="email-detailed">
              <div className="header-email-detailed">
                <Link to="/plataforma/mensajes">
                  <div className="btn-back">
                    <img src={imgBack} alt="" />
                  </div>
                </Link>
                <div>
                  <div className="nameInitial">{showFirstLetter()}</div>
                </div>
                <div className="email-subject">{message.subject}</div>
                <div className="date">{message.date}</div>
                {/* <div className="reply">
                  <img src={imgReply} alt="" />
                </div> */}
              </div>
              <hr />
              <div className="receiver">
                <i>De:</i> {message.sender}
              </div>
              <hr />
              <div className="receiver">
                <i>Para:</i> {message.receptor}
              </div>
              <hr />
              <div
                className="body-email-detailed"
                dangerouslySetInnerHTML={{ __html: message.messageText }}
              ></div>
              {message.file && (
                <div className="document-linked">
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "zip" && (
                    <span className="file-img">
                      <img src={imgZipRar} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "rar" && (
                    <span className="file-img">
                      <img src={imgZipRar} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "jpge" && (
                    <span className="file-img">
                      <img src={imgImage} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "jpg" && (
                    <span className="file-img">
                      <img src={imgImage} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "png" && (
                    <span className="file-img">
                      <img src={imgImage} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "mp4" && (
                    <span className="file-img">
                      <img src={imgVideo} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "mov" && (
                    <span className="file-img">
                      <img src={imgVideo} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "avi" && (
                    <span className="file-img">
                      <img src={imgVideo} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "docx" && (
                    <span className="file-img">
                      <img src={imgDoc} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "doc" && (
                    <span className="file-img">
                      <img src={imgDoc} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "ppt" && (
                    <span className="file-img">
                      <img src={imgPpt} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "pptx" && (
                    <span className="file-img">
                      <img src={imgPpt} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "xls" && (
                    <span className="file-img">
                      <img src={imgExcel} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "xlsx" && (
                    <span className="file-img">
                      <img src={imgExcel} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "pdf" && (
                    <span className="file-img">
                      <img src={imgPdf} alt="" />
                    </span>
                  )}
                  {message.file
                    ?.split(".")
                    [message.file?.split(".").length - 1].split("<")[0] ===
                    "txt" && (
                    <span className="file-img">
                      <img src={imgText} alt="" />
                    </span>
                  )}
                  <div
                    className="file"
                    dangerouslySetInnerHTML={{ __html: message.file }}
                  ></div>
                </div>
              )}
              {userEmail === message.sender ? null : (
                <div className="footer-email-detailed">
                  <div
                    onClick={() => setModalRedactEmail(true)}
                    className="btn-email-detailed"
                  >
                    <img src={imgReply} alt="" />
                    <span>Responder</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailDetailed;
