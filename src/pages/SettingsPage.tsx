import React from "react";
import SettingsMainTitle from "../components/settings/SettingsMainTitle";
import UploadImageProfile from "../components/settings/UploadImageProfile";
import UploadSchoolLogo from "../components/settings/UploadSchoolLogo";
import ChangePassword from "../components/settings/ChangePassword";

import imgProfileImage from "../assets/images/profile_image_settings.png";
import imgPassword from "../assets/images/password_settings.png";
import imgSchoolLogo from "../assets/images/img-school-logo.png";

const SettingsPage = () => {
  return (
    <>
      <div className="settings-page">
        <div className="settings-page-container global-container">
          <div className="settings-global-card">
            <SettingsMainTitle img={imgProfileImage} title="Imagen de perfil" />
            <UploadImageProfile />
          </div>

          {/* <div className="settings-global-card">
            <SettingsMainTitle img={imgSchoolLogo} title="Logo Escolar" />
            <UploadSchoolLogo />
          </div> */}

          <div className="settings-global-card">
            <SettingsMainTitle img={imgPassword} title="Cambiar contraseña" />
            <ChangePassword />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
