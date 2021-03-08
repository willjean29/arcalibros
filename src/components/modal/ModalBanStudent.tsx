import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import imgClose from "../../assets/images/btn-close.png";
import { banStudent } from "../../store/classroom/classroom.actions";
import { Classroom } from "../../store/classroom/interfaces/classroom.interface";
import { RootStore } from "../../store/store";
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
};

const ModalBanParticipant: React.FC<Props> = ({ setModalOpen, id }) => {
  const dispatch = useDispatch();
  const selectedClassroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom as Classroom
  );
  const handleBanStudent = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      banStudent({ student: id, classroom: selectedClassroom?._id as string })
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
        <h3 className="welcometo">Bloquear estudiante</h3>
        <p>¿Estás seguro que deseas bloquear a este estudiante?</p>
        <form onSubmit={handleBanStudent}>
          <div className="deleteModalOptions">
            <button className="btn-modal" type="submit">
              Suspender
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

export default ModalBanParticipant;
