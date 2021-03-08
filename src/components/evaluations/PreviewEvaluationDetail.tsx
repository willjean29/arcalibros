import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import imgDownload from "../../assets/icons/calendar.png";
import { AnswerExam } from "../../store/exam/interfaces/answer-exam.interface";
import { RootStore } from "../../store/store";
//@ts-ignore
import ReactToPdf from "react-to-pdf";
interface IProps {
  answersExam: AnswerExam[];
  targetRef: any;
  examClassroomName: string;
}

const PreviewEvaluationDetail: React.FC<IProps> = ({
  answersExam: answerExam,
  targetRef,
  examClassroomName,
}) => {
  const questions = answerExam[0].answers.length;
  const [totalCorrect, setTotalCorrect] = useState(0);
  useEffect(() => {
    total();
  }, []);
  const total = () =>
    answerExam.forEach((examResult) => {
      setTotalCorrect((prevCount) => prevCount + examResult.correct);
    });
  const accuracy = (totalCorrect * 100) / (answerExam.length * questions);
  const options = {
    orientation: "landscape",
    format: [1000, 200 + answerExam.length * 100],
    precision: 0,
  };
  return (
    <div className="evaluation-information">
      <div className="info-item">
        <span>{Math.round(accuracy)}%</span>
        Exactitud
      </div>
      <div className="info-item">
        <span>{questions}</span>
        Preguntas
      </div>
      <div className="info-item">
        <span>{answerExam.length}</span>
        Participantes
      </div>
      <div className="info-item download">
        <div>
          <ReactToPdf
            targetRef={targetRef}
            filename={`${examClassroomName} - NOTAS.pdf`}
            options={options}
          >
            {({ toPdf }: { toPdf: any }) => (
              <span onClick={toPdf}>
                <img src={imgDownload} alt="" />
                <h6>Descargar notas</h6>
              </span>
            )}
          </ReactToPdf>
        </div>
        {/* <span>
          <img src={imgDownload} alt="" />
        </span>
        Descargar */}
      </div>
    </div>
  );
};

export default PreviewEvaluationDetail;
