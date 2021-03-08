import React from "react";
interface IProps {
  excercise: {
    type: number;
    statement: string;
    fillAnswer: string;
    course: string;
  };
  photo: any;
}
const PhonePreviewFillBlank: React.FC<IProps> = ({ excercise, photo }) => {
  return (
    <div className="preview fill-blank">
      <div className="phone-frame">
        <div className="phone-content">
          <div className="phone-container">
            <div className="question">
              {excercise.statement || "Pregunta o enunciado"}
            </div>
            <div className="image">
              <img src={photo} alt="" />
            </div>
            <div className="preview-fill">
              <input
                type="text"
                placeholder="Ingresa tu respuesta"
                value={excercise.fillAnswer || "Escribe una respuesta"}
                contentEditable="false"
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreviewFillBlank;
