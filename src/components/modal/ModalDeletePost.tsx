import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { deleteClassroomComment } from "../../store/classroom/classroom.actions";
import { ClassroomComment } from "../../store/classroom/interfaces/classroom-comment.interface";
import imgClose from "../../assets/images/btn-close.png";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  comment: ClassroomComment;
  classroomId: string;
};

const ModalDeletePost: React.FC<Props> = ({
  setModalOpen,
  comment,
  classroomId,
}) => {
  const dispatch = useDispatch();
  const handleDeletePost = (e: any) => {
    e.preventDefault();
    dispatch(deleteClassroomComment(comment, classroomId));
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

export default ModalDeletePost;
