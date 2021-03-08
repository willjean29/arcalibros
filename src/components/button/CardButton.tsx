import React from "react";
import { Link } from "react-router-dom";

interface CardButtonProps {
  imgCard: string;
  title: string;
  description: string;
  to: string;
}

const CardButton: React.FC<CardButtonProps> = ({
  imgCard,
  title,
  description,
  to,
}) => {
  return (
    <>
      {title === "Recursos" ? (
        <a href={to} target="_blank" rel="noopener noreferrer" className="card-button">
          <div className="card-button-container">
            <img src={imgCard} alt="" />
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </a>
      ) : (
        <Link to={to} className="card-button">
          <div className="card-button-container">
            <img src={imgCard} alt="" />
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </Link>
      )}
    </>
  );
};

export default CardButton;
