import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import imgClose from "../../assets/images/btn-close.png";
import { TopicComment } from "../../store/topic/interfaces/topic-comment.interface";
import { deleteTopicComment } from "../../store/topic/topic.actions";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  comment: TopicComment;
  topicId: string;
};

const ModalDeletePostTopic: React.FC<Props> = ({
  setModalOpen,
  comment,
  topicId,
}) => {
  const dispatch = useDispatch();
  const handleDeletePost = (e: any) => {
    e.preventDefault();
    dispatch(deleteTopicComment(comment, topicId));
    setModalOpen(false);
  };
  
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Eliminar publicación</h3>
        <p>¿Estás seguro que deseas eliminar esta publicación?</p>
        <form onSubmit={handleDeletePost}>
          <div className="deleteModalOptions">
            <button className="btn-modal" type="submit">
              Borrar
            </button>
            <button
              className="btn-modal btn-cancel"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalDeletePostTopic;
