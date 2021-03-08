import React from "react";
import { AlternativeDto } from "../../../store/excercise/dtos/alternative.dto";

interface IProps {
  excercise: {
    type: number;
    statement: string;
    alternatives: AlternativeDto[];
    selectionAnswer: string;
    course: string;
  };
  photo: any;
}
const PhonePreviewSelection: React.FC<IProps> = ({ excercise, photo }) => {
  //subrayar el que es la respuesta
  return (
    <div className="preview">
      <div className="phone-frame">
        <div className="phone-content">
          <div className="phone-container">
            <div className="question">
              {excercise.statement || "Pregunta o enunciado"}
            </div>
            <div className="image">
              <img src={photo} alt="" />
            </div>
            {excercise.alternatives.map((alternative, index) =>
              alternative.text === excercise.selectionAnswer ? (
                <div className="alternative" key={index}>
                  {alternative.text || "Ingresa una alternativa"}
                </div>
              ) : (
                <div className="alternative" key={index}>
                  {alternative.text || "Ingresa una alternativa"}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreviewSelection;
