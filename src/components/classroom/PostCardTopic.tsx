import React, { useState } from "react";

import imgTrash from "../../assets/images/deletePosts.png";
import imgZipRar from "../../assets/icons/ziprar.png";
import imgDoc from "../../assets/icons/doc.png";
import imgPpt from "../../assets/icons/ppt.png";
import imgExcel from "../../assets/icons/excel.png";
import imgPdf from "../../assets/icons/pdf.png";
import imgText from "../../assets/icons/text.png";
import imgImage from "../../assets/icons/image.png";
import imgVideo from "../../assets/icons/video.png";

import Modal from "../modal/Modal";
import ModalDeletePostTopic from "../modal/ModalDeletePostTopic";
import { TopicComment } from "../../store/topic/interfaces/topic-comment.interface";
import { RootStore } from "../../store/store";
import { useSelector } from "react-redux";
import { UserType } from "../../utils/enums";

interface PostCardProps {
  imgUser: string;
  course: string;
  name: string;
  type: string;
  date: string;
  message: string;
  profileImg: string;
  comment: TopicComment;
  topicId: string;
  file?: string;
  link?: string;
}

const PostCardTopic: React.FC<PostCardProps> = ({
  imgUser,
  course,
  name,
  date,
  type,
  message,
  profileImg,
  comment,
  topicId,
  file,
  link
}) => {
  const [modalDeletePostTopic, setModalDeletePostTopic] = useState(false);
  const userType = useSelector(
    (state: RootStore) => state.user.user?.type as number
  );

  return (
    <div className="post-card">
      <Modal modalOpen={modalDeletePostTopic}>
        <ModalDeletePostTopic
          setModalOpen={setModalDeletePostTopic}
          comment={comment}
          topicId={topicId}
        />
      </Modal>
      <div className="post-card-header">
        <div className="user-profile">
          <img src={profileImg !== "default" ? profileImg : imgUser} alt="" />
        </div>
        <div className="user-information">
          <div className="main-headding-post">
            <div className="post-header-container">
              <h4 className="nameUser strong">
                {name}
                <span className="published"> publicado en {course}</span>
              </h4>
              <h6 className="published">
                <small className="date-post">
                  publicado por un <span className="strong">
                    {type}
                  </span> el {date}
                </small>
              </h6>
            </div>
            {userType === UserType.TEACHER ? (
            <div className="extra-post">
              <button
                className="delete-post"
                onClick={() => {
                  setModalDeletePostTopic(true);
                }}
              >
                <img src={imgTrash} alt="" />
              </button>
            </div>
             ) : null}
          </div>
        </div>
      </div>
      <div className="post-card-body">
        <div className="post-data">
          <p>{message}</p>
        </div>
        {(file as string) && (
          <div className="document-link">
            {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "zip" && (
              <span className="file-img">
                <img src={imgZipRar} alt="" />
              </span>
            )}
            {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "rar" && (
              <span className="file-img">
                <img src={imgZipRar} alt="" />
              </span>
            )}
             {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "jpge" && (
              <span className="file-img">
                <img src={imgImage} alt="" />
              </span>
            )}
             {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "jpg" && (
              <span className="file-img">
                <img src={imgImage} alt="" />
              </span>
            )}
             {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "png" && (
              <span className="file-img">
                <img src={imgImage} alt="" />
              </span>
            )}
            {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "mp4" && (
              <span className="file-img">
                <img src={imgVideo} alt="" />
              </span>
            )}
             {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "mov" && (
              <span className="file-img">
                <img src={imgVideo} alt="" />
              </span>
            )}
             {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "avi" && (
              <span className="file-img">
                <img src={imgVideo} alt="" />
              </span>
            )}
            {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "docx" && (
              <span className="file-img">
                <img src={imgDoc} alt="" />
              </span>
            )}
            {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "doc" && (
              <span className="file-img">
                <img src={imgDoc} alt="" />
              </span>
            )}
            {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "ppt" && (
              <span className="file-img">
                <img src={imgPpt} alt="" />
              </span>
            )}
            {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "pptx" && (
              <span className="file-img">
                <img src={imgPpt} alt="" />
              </span>
            )}
            {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "xls" && (
              <span className="file-img">
                <img src={imgExcel} alt="" />
              </span>
            )}
            {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "xlsx" && (
              <span className="file-img">
                <img src={imgExcel} alt="" />
              </span>
            )}
            {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "pdf" && (
              <span className="file-img">
                <img src={imgPdf} alt="" />
              </span>
            )}
            {file?.split(".")[file?.split(".").length - 1].split("<")[0] ===
              "txt" && (
              <span className="file-img">
                <img src={imgText} alt="" />
              </span>
            )}
            <div
              className="file"
              dangerouslySetInnerHTML={{ __html: file as string }}
            ></div>
          </div>
        )}
        {(comment.link as string) && (
          <div
            className="file"
            dangerouslySetInnerHTML={{ __html: comment.link as string }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default PostCardTopic;
