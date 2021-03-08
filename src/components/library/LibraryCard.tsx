import React, { Dispatch, SetStateAction } from "react";

interface Props {
    image: string;
    title: string;
    // setLevelSelected: Dispatch<SetStateAction<string>>
}

const LibraryCard: React.FC<Props> = ({image, title}) => {
  // const handleLevelSelected = (level: string) => {
  //   setLevelSelected(level);
  // }
  return (
    <div className="library-card" >
      <img
        src={image}
        alt=""
      />
      <h3 className="title">{title}</h3>
    </div>
  );
};

export default LibraryCard;
