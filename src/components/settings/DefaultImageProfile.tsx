import React from "react";

interface Props {
  imgChild: string;
}

const DefaultImageProfile: React.FC<Props> = ({ imgChild }) => {
  return (
    <div className="profile-image">
      <img src={imgChild} alt="" />
      </div>
  );
};

export default DefaultImageProfile;
