import React, { useState } from "react";
import imgEye from "../../assets/icons/eye.png";
import imgSend from "../../assets/icons/send.png";

interface ICommentsPerPost {
  profileImg: string;
  imgUser: string;
}
const CommentsPerPost: React.FC<ICommentsPerPost> = ({
  profileImg,
  imgUser,
}) => {
  const [showComments, setShowComments] = useState(false);

  const handleShowCommentsPerPost = () => {
    setShowComments(!showComments);
  };
  return (
    <div className="comments-per-post">
      <div className="comment-field">
        <div className="user-image">
          <img src={profileImg !== "default" ? profileImg : imgUser} alt="" />
        </div>
        <div className="text-field">
          <span className="textarea" role="textbox" contentEditable></span>
          <div className="buttons">
            <button className="send">
              <img src={imgSend} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="show-comments" onClick={handleShowCommentsPerPost}>
        <span>27 comentarios</span>
        <span className="view-more">
          <img src={imgEye} alt="" />
          <small>mostrar más</small>
        </span>
      </div>
      {showComments && (
        <div className="comments">
          <div className="comment">
            <div className="user-image">
              <img
                src={profileImg !== "default" ? profileImg : imgUser}
                alt=""
              />
            </div>
            <div className="comment-content">
              <div className="name">Luis Gabriel Hernandez</div>
              <p className="comment-detail">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
                quam eius libero rerum blanditiis repellendus architecto? Nulla
                tempora ducimus voluptates. Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Placeat aperiam suscipit pariatur
                rerum distinctio exercitationem blanditiis autem deleniti, ut
                quidem explicabo hic quibusdam minus animi soluta totam
                necessitatibus quod saepe doloribus. Veniam soluta
                exercitationem asperiores, dolorem, assumenda animi omnis
                laboriosam optio quae, ducimus reiciendis velit libero natus
                pariatur minus harum?
              </p>
            </div>
          </div>
          <div className="comment">
            <div className="user-image">
              <img
                src={profileImg !== "default" ? profileImg : imgUser}
                alt=""
              />
            </div>
            <div className="comment-content">
              <div className="name">Luis Gabriel Hernandez</div>
              <p className="comment-detail">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
                quam eius libero rerum blanditiis repellendus architecto? Nulla
                tempora ducimus voluptates. Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Placeat aperiam suscipit pariatur
                rerum distinctio exercitationem blanditiis autem deleniti, ut
                quidem explicabo hic quibusdam minus animi soluta totam
                necessitatibus quod saepe doloribus. Veniam soluta
                exercitationem asperiores, dolorem, assumenda animi omnis
                laboriosam optio quae, ducimus reiciendis velit libero natus
                pariatur minus harum?
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsPerPost;
