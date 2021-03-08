import React from "react";

interface Props {
  img: string;
  title: string;
}

const SettingsMainTitle: React.FC<Props> = ({ img, title }) => {
  return (
    <div className="settings-title">
      <div className="settings-title-box">
        <img src={img} alt="" />
        <h4 className="title-left">{title}</h4>
      </div>
    </div>
  );
};

export default SettingsMainTitle;
