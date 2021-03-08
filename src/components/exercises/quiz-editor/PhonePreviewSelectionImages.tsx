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
  photo1: any;
  photo2: any;
  photo3: any;
  photo4: any;
}
const PhonePreviewSelectionImages: React.FC<IProps> = ({
  excercise,
  photo1,
  photo2,
  photo3,
  photo4,
}) => {
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
              <img src={photo1} alt="" />
            </div>
            <div className="image">
              <img src={photo2} alt="" />
            </div>
            <div className="image">
              <img src={photo3} alt="" />
            </div>
            <div className="image">
              <img src={photo4} alt="" />
            </div>
            {/* {excercise.alternatives.map((alternative, index) =>
              alternative.text === excercise.selectionAnswer ? (
                <div className="alternative-images" key={index}>
                  {alternative.text || (
                    <img
                      src="https://www.eluniversal.com.mx/sites/default/files/2020/03/19/como_extraer_un_texto_de_una_imagen.jpg"
                      alt=""
                    />
                  )}
                </div>
              ) : (
                <div className="alternative-images" key={index}>
                  {alternative.text || (
                    <img
                      src="https://www.eluniversal.com.mx/sites/default/files/2020/03/19/como_extraer_un_texto_de_una_imagen.jpg"
                      alt=""
                    />
                  )}
                </div>
              )
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreviewSelectionImages;
