import React from "react";

interface AlternativeProps {
  className: string;
  text: string;
  photo?: string;
  onClicked: (e: any) => void;
}

const Alternative: React.FC<AlternativeProps> = (props) => {
  return (
    <div className={props.className} onClick={props.onClicked}>
      {props.text}
    </div>
  );
};

export default Alternative;
