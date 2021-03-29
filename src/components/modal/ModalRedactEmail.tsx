import React, {
  Dispatch,
  SetStateAction,
  useState,
  MouseEvent,
  useEffect,
} from "react";

import imgClose from "../../assets/images/btn-close.png";
import imgAttach from "../../assets/icons/attach.png";

import imgZipRar from "../../assets/icons/ziprar.png";
import imgDoc from "../../assets/icons/doc.png";
import imgPpt from "../../assets/icons/ppt.png";
import imgExcel from "../../assets/icons/excel.png";
import imgPdf from "../../assets/icons/pdf.png";
import imgText from "../../assets/icons/text.png";
import imgImage from "../../assets/icons/image.png";
import imgVideo from "../../assets/icons/video.png";

import MessageEditor from "../messages/MessageEditor";
import { RootStore } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { newMessage } from "../../store/messaging/messaging.actions";
import moment from "moment";
import axios, { AxiosError } from "axios";
import {
  messagingURL,
  MESSAGE_NEW,
  MESSAGE_SEND_ERROR,
} from "../../store/messaging/messaging.types";
import AutoSuggestEmail from "../autosuggest/AutoSuggestEmail";
import { toast } from "react-toastify";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalRedactEmail: React.FC<Props> = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const [newFile, setNewFile] = useState<any>(null);
  function handleUpload(event: any) {
    setNewFile(event.target.files[0]);
  }
  const notificationReceptor = useSelector(
    (state: RootStore) => state.messaging.individualMessage?.sender
  );
  const sender = useSelector(
    (state: RootStore) => state.user.user?.email
  ) as string;

  const [messageErrors, setMessageErrors] = useState([] as string[]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const [receptor, setReceptor] = useState("");
  const [subject, setSubject] = useState("");
  const handleChange = (value: any) => {
    setMessageText(value);
  };
  const handleSendMessage = async (e: MouseEvent) => {
    e.preventDefault();

    if (sender === receptor) {
      setMessageErrors(["Destinarario incorrecto"]);
      return;
    }
    if (newFile === null) {
      const messageDto = {
        messageText,
        receptor: notificationReceptor ? notificationReceptor : receptor,
        read: false,
        sender,
        subject,
        date: moment().locale("es").format("LLL"),
      };

      try {
        const res = await axios.post(messagingURL, messageDto);
        console.log(res.data);
        dispatch({
          type: MESSAGE_NEW,
          payload: undefined,
        });
        toast.success("Mensaje enviado");
        setModalOpen(false);
      } catch (error) {
        const errorAxios: AxiosError = error;
        setMessageErrors(errorAxios.response?.data.message as string[]);
      }
    } else {
      const formData = new FormData();
      formData.append("file", newFile);
      const hour = Date.now();
      try {
        setLoading(true);
        const res = await axios.post(
          messagingURL.concat(`upload/${hour}`),
          formData
        );
        if (res.data.file) {
          const messageDto = {
            messageText,
            receptor: notificationReceptor ? notificationReceptor : receptor,
            read: false,
            sender,
            subject,
            file: `<a href="http://localhost:4000/messaging/download/${hour}${res.data.file}" target="_blank">${newFile.name}</a>`,
            date: moment().locale("es").format("LLL"),
          };
          const res2 = await axios.post(messagingURL, messageDto);
          console.log(res.data);
          dispatch({
            type: MESSAGE_NEW,
            payload: undefined,
          });
          toast.success("Mensaje enviado");
          setModalOpen(false);
        }
      } catch (error) {
        toast.error("Error al enviar mensaje");
      }
    }
  };
  const handleEmailSelection = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    event.preventDefault();
    setReceptor(value as string);
  };

  useEffect(() => {}, [messageErrors]);
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />

      <form className="card-modal-general redact-message">
        <div className="header-modal">
          <h3 className="welcometo">Mensaje nuevo</h3>
          {messageErrors && messageErrors[0]}
          <button className="close-modal" onClick={() => setModalOpen(false)}>
            <img src={imgClose} alt="" />
          </button>
        </div>
        <hr />
        <div className="destinatary">
          <label htmlFor="">Para</label>

          <input
            type="text"
            value={notificationReceptor ? notificationReceptor : receptor}
            onChange={(e) => setReceptor(e.target.value)}
          />
          {/* <AutoSuggestEmail
            onChangeInput={handleEmailSelection}
            actualValue={notificationReceptor ? notificationReceptor : receptor}
          /> */}
        </div>
        <hr />
        <div className="subject">
          <input
            type="text"
            placeholder="Asunto"
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="body-message">
          <MessageEditor handleChange={handleChange} text={messageText} />
        </div>
        <div className="footer-message">
          <label htmlFor="choose-file" className="button">
            <img src={imgAttach} alt="" />
            <span>Agregar</span>
            <input
              type="file"
              className="choose-files"
              id="choose-file"
              onChange={handleUpload}
            />
          </label>
          <button className="btn-modal" onClick={handleSendMessage}>
            Enviar
          </button>
        </div>
        <div className="files-preview">
          {loading && <p>{loading}</p>}
          {newFile && (
            <div className="document-link">
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "zip" && (
                <span className="file-img">
                  <img src={imgZipRar} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "rar" && (
                <span className="file-img">
                  <img src={imgZipRar} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "jpg" && (
                <span className="file-img">
                  <img src={imgImage} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "jpge" && (
                <span className="file-img">
                  <img src={imgImage} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "png" && (
                <span className="file-img">
                  <img src={imgImage} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "mp4" && (
                <span className="file-img">
                  <img src={imgVideo} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "avi" && (
                <span className="file-img">
                  <img src={imgVideo} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "mov" && (
                <span className="file-img">
                  <img src={imgVideo} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "docx" && (
                <span className="file-img">
                  <img src={imgDoc} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "doc" && (
                <span className="file-img">
                  <img src={imgDoc} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "ppt" && (
                <span className="file-img">
                  <img src={imgPpt} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "pptx" && (
                <span className="file-img">
                  <img src={imgPpt} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "xls" && (
                <span className="file-img">
                  <img src={imgExcel} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "xlsx" && (
                <span className="file-img">
                  <img src={imgExcel} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "pdf" && (
                <span className="file-img">
                  <img src={imgPdf} alt="" />
                </span>
              )}
              {newFile.name.split(".")[newFile.name.split(".").length - 1] ===
                "txt" && (
                <span className="file-img">
                  <img src={imgText} alt="" />
                </span>
              )}
              <div className="file">{newFile.name}</div>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default ModalRedactEmail;
