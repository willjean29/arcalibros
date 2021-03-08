import React from "react";
import { AlternativeDto } from "../../../store/excercise/dtos/alternative.dto";

interface IProps {
  excercise: {
    type: number;
    statement: string;
    alternatives: AlternativeDto[];
    dragGroups: string[];
    course: string;
  };
}
const PhonePreviewDnD: React.FC<IProps> = ({ excercise }) => {
  return (
    <div className="preview dnd">
      <div className="phone-frame">
        <div className="phone-content">
          <div className="phone-container">
            <div className="question">
              {excercise.statement || "Pregunta o enunciado"}
            </div>

            <div className="preview-options">
              {excercise.alternatives.map((alternative, index) => (
                <div className="preview-item" key={index}>
                  {alternative.text || "Item"}
                </div>
              ))}
            </div>
            <div className="groups-container">
              <div className="group-box">
                <div className="title">
                  {excercise.dragGroups[0] || "Grupo 1"}
                </div>
              </div>
              <div className="group-box">
                <div className="title">
                  {excercise.dragGroups[1] || "Grupo 2"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreviewDnD;
