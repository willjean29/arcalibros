import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface CardButtonProps {
    imgCard: string;
    title: string;
    description: string;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CardButtonModal: React.FC<CardButtonProps> = ({imgCard, title, description, setModalOpen}) => {
  return (
    <div
    onClick={()=> setModalOpen(true)}
      className="card-button"
    >
      <div className="card-button-container">
        <img src={imgCard} alt="" />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CardButtonModal;
