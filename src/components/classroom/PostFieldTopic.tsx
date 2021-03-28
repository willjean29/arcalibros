import React, { FormEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import imgSendDark from "../../assets/icons/send2.png";
import imgSendWhite from "../../assets/icons/send.png";
import imgZipRar from "../../assets/icons/ziprar.png";
import imgDoc from "../../assets/icons/doc.png";
import imgPpt from "../../assets/icons/ppt.png";
import imgExcel from "../../assets/icons/excel.png";
import imgPdf from "../../assets/icons/pdf.png";
import imgText from "../../assets/icons/text.png";
import imgLink from "../../assets/icons/icons8-link-50.png";

import { RootStore } from "../../store/store";
import { UserType } from "../../utils/enums";
import axios from "axios";
import imgAttach from "../../assets/icons/attach.png";
import moment from "moment";

import { addTopicComment } from "../../store/topic/topic.actions";
import { classroomsURL } from "../../store/classroom/classroom.types";
import Loading from "../loading/Loading";
import Modal from "../modal/Modal";
import ModalURL from "../modal/ModalURL";

interface PostFieldProps {
  imgUser: string;
  topicId: string;
}

const PostFieldTopic: React.FC<PostFieldProps> = ({ imgUser, topicId }) => {
  const [comment, setComment] = useState("");
  const [openModalURL, setOpenModalURL] = useState(false);
  const [loading, setLoading] = useState<any>(null);
  const [link, setLink] = useState("");
  const { type, _id, firstName, lastName } = useSelector(
    (state: RootStore) => state.user.user!
  );
  const [newFile, setNewFile] = useState<any>(null);
  const profileImg = useSelector(
    (state: RootStore) => state.user.profileImg
  ) as string;
  const selectedTopic = useSelector(
    (state: RootStore) => state.topic.selectedTopic
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setComment("");
  }, [selectedTopic]);
  function handleUpload(event: any) {
    setNewFile(event.target.files[0]);
  }

  const toggleLinkModal = (e: any) => {
    e.preventDefault();
    setOpenModalURL(true);
  };

  const handleTopicComment = async (e: FormEvent) => {
    e.preventDefault();


    // https://www.youtube.com/watch?v=YJrC9pa1RQU
    // https://youtu.be/YJrC9pa1RQU
    // https://www.youtube.com/embed/YJrC9pa1RQU
    let finalContent;
    let youtube_URL = "https://www.youtube.com/embed/";
    let url_embed;
    let youtubeCode = "";
    let BASE_URL = link.split("/");
    console.log(BASE_URL[2]);

    if (BASE_URL[2] === "www.youtube.com") {
      youtubeCode = BASE_URL[3].split("v=")[1];
      url_embed = youtube_URL.concat(youtubeCode);
      finalContent = `<div class="url-content">
      <a class="post-link" href=${link} target="_blank">${link}</a>
     <div class="responsive-iframe">
      <iframe src=${url_embed} title=${url_embed}></iframe>
     </div>
    </div>`;
      console.log(finalContent);
    } else if (BASE_URL[2] === "youtu.be") {
      youtubeCode = BASE_URL[3];
      url_embed = youtube_URL.concat(youtubeCode);
      finalContent = `<div class="url-content">
      <a class="post-link" href=${link} target="_blank">${link}</a>
     <div class="responsive-iframe">
      <iframe src=${url_embed} title=${url_embed}></iframe>
     </div>
    </div>`;
      console.log(finalContent);
    } else if (BASE_URL[3] === "embed") {
      youtubeCode = BASE_URL[4];
      url_embed = youtube_URL.concat(youtubeCode);
      finalContent = `<div class="url-content">
      <a class="post-link" href=${link} target="_blank">${link}</a>
     <div class="responsive-iframe">
      <iframe src=${url_embed} title=${url_embed}></iframe>
     </div>
    </div>`;
      console.log(finalContent);
    } else if (BASE_URL[2] !== "www.youtube.com") {
      finalContent = `<div class="url-content">
        <a class="post-link" href=${link} target="_blank">${link}</a>
    </div>`;
      console.log(finalContent);
    }
    

    if (newFile === null) {
      const topicCommentDto = {
        author: _id as string,
        name: firstName.concat(" " + lastName),
        type,
        comment,
        ...(link
          ? {
              link: finalContent,
            }
          : undefined),
        date: moment().locale("es").format("LLL"),
        profileImg: profileImg !== "default" ? profileImg : "default",
      };
      console.log(topicCommentDto)
      dispatch(addTopicComment(topicCommentDto, topicId));
      setLink("");
    } else {
      const formData = new FormData();
      formData.append("file", newFile);
      const hour = Date.now();
      try {
        setLoading(true);
        const res = await axios.post(
          classroomsURL.concat(`upload/${hour}&${topicId}`),
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.data.file) {
          const topicCommentFileDto = {
            author: _id as string,
            name: firstName.concat(" " + lastName),
            type,
            comment,
            ...(link ? { link: finalContent } : undefined),
            file: `<a href="https://meet.arcavirtual.net/classrooms/download/${topicId}&${hour}${newFile.name}" target="_blank">${newFile.name}</a>`,
            date: moment().locale("es").format("LLL"),
            profileImg: profileImg !== "default" ? profileImg : "default",
          };
          dispatch(addTopicComment(topicCommentFileDto, topicId));
          setComment("");
          setLoading(null);
          setNewFile(null);
          setLink("");
        }
      } catch (error) {}
    }
  };
  const handleCancelComment = (e: MouseEvent) => {
    e.preventDefault();
    setComment("");
    setNewFile(null);
  };

  return loading === true ? (
    <Loading />
  ) : (
    <div className="field-post">
      <Modal modalOpen={openModalURL}>
        <ModalURL setModalOpen={setOpenModalURL} change={setLink} />
      </Modal>
      <form className="input-field" onSubmit={handleTopicComment}>
        <div className="text-inputfield">
          Compartir con la clase
          <textarea
            placeholder="Comience una discusión"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="files-preview">
          {newFile && (
            <div className="document-link">
              {console.log()}
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
          {link && <p>{link}</p>}
        </div>
        <div className="footer-post">
          {type === UserType.TEACHER && (
            <div className="extra-info">
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
              <button
                className="button small"
                onClick={(e) => toggleLinkModal(e)}
              >
                <img src={imgLink} alt="" />
                <span>Link</span>
              </button>
            </div>
          )}

          <div className="footer-right">
            <button className="button btn-cancel" onClick={handleCancelComment}>
              Cancelar
            </button>
            <button className="button btn-post" type="submit">
              <span>Publicar</span>
              <img src={imgSendWhite} alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostFieldTopic;
