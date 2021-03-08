import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import imgClose from "../../assets/images/btn-close.png";
import { unbanStudent } from "../../store/classroom/classroom.actions";
import { Classroom } from "../../store/classroom/interfaces/classroom.interface";
import { RootStore } from "../../store/store";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
};

const ModalUnbanParticipant: React.FC<Props> = ({ setModalOpen, id }) => {
  const dispatch = useDispatch();
  const selectedClassroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom as Classroom
  );
  const handleUnbanStudent = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      unbanStudent({ student: id, classroom: selectedClassroom?._id as string })
    );
    setModalOpen(false);
  };
  return (
    <>
      <div className="modverlay" onClick={() => setModalOpen(false)} />
      <div className="card-modal-general">
        <button className="close-modal" onClick={() => setModalOpen(false)}>
          <img src={imgClose} alt="" />
        </button>
        <h3 className="welcometo">Desbloquear estudiante</h3>
        <p>¿Estás seguro que deseas desbloquear a este estudiante?</p>
        <form onSubmit={handleUnbanStudent}>
          <div className="deleteModalOptions">
            <button className="btn-modal" type="submit">
              Quitar Suspensión
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

export default ModalUnbanParticipant;
