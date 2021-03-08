import React, { useRef, useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import imgResources from "../assets/images/addResources.png";
import imgBooks from "../assets/images/addBook.png";
import AdBanner from "../components/home/AdBanner";
import Modal from "../components/modal/Modal";
import ModalCreateClassroom from "../components/modal/ModalCreateClassroom";
import CreateRoomCard from "../components/home/CreateRoomCard";
import CardButton from "../components/button/CardButton";
import SchoolLogo from "../components/home/SchoolLogo";
import ModalAddBook from "../components/modal/ModalAddBook";
import CardButtonModal from "../components/button/CardButtonModal";
import ModalStudentJoin from "../components/modal/ModalStudentJoin";
import { UserType } from "../utils/enums";
import { useSelector } from "react-redux";
import { RootStore } from "../store/store";
import JoinClasssroom from "../components/home/JoinClassroom";

const StartPage = () => {
  const user = useSelector((state: RootStore) => state.user.user);
  const [modalCreateClassroom, setModalCreateClassroom] = useState(false);
  const [modalAddBook, setModalAddBook] = useState(false);
  const [modalStudentJoin, setModalStudentJoin] = useState(false);

  return (
    <div className="start-page">
      <Modal modalOpen={modalCreateClassroom}>
        <ModalCreateClassroom setModalOpen={setModalCreateClassroom} />
      </Modal>
      <Modal modalOpen={modalStudentJoin}>
        <ModalStudentJoin setModalOpen={setModalStudentJoin} />
      </Modal>
      <Modal modalOpen={modalAddBook}>
        <ModalAddBook setModalOpen={setModalAddBook} />
      </Modal>

      <div className="start-page-container global-container">
        <div className="two-components-logo">
          {user?.type === UserType.TEACHER ? (
            <CreateRoomCard setModalOpen={setModalCreateClassroom} />
          ) : (
            <JoinClasssroom setModalOpen={setModalStudentJoin} />
          )}
          <SchoolLogo />
        </div>

        <div className="two-components">
          <CardButtonModal
            title="Añadir libro"
            setModalOpen={setModalAddBook}
            description="Ingrese los códigos proporcionados"
            imgCard={imgBooks}
          />
          <CardButton
            title="Recursos"
            description="En construcción"
            to="https://drive.arcavirtual.net/"
            imgCard={imgResources}
          />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
