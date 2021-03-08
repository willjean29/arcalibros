import React from "react";

interface IProps {
  id: string;
  className: string;
  drop?: (e: any) => void;
  dragOver?: (e: any) => void;
}

const ContainerDnD: React.FC<IProps> = (props) => {
  return (
    <div
      id={props.id}
      className={props.className}
      onDrop={props.drop}
      onDragOver={props.dragOver}
    >
      <div className="title">{props.id}</div>
      {props.children}
    </div>
  );
};

export default ContainerDnD;
