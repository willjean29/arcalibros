import React, { FormEvent, useEffect, useState } from "react";
import DefaultImageProfile from "./DefaultImageProfile";

import { useDispatch, useSelector } from "react-redux";
import imgUser from "../../assets/images/user.png";
import { RootStore } from "../../store/store";
import { updateProfileImage } from "../../store/user/user.actions";
const UploadImageProfile = () => {
  type UploadEvent = React.ChangeEvent<HTMLInputElement>;
  const dispatch = useDispatch();
  const imgProfileUser = useSelector(
    (state: RootStore) => state.user.profileImg
  );
  const [profileImg, setProfileImg] = useState<any>(
    imgProfileUser === "default" ? imgUser : imgProfileUser
  );
  const [imgFile, setImgFile] = useState<File | null>(null);
  const handleImgUpload = (e: FormEvent) => {
    e.preventDefault();
    if (imgFile) {
      dispatch(updateProfileImage(imgFile));
    }
  };

  useEffect(() => {}, [imgProfileUser]);
  const handleImgSelection = (e: UploadEvent) => {
    e.preventDefault();
    if (e.target.files!.length > 0) {
      const reader = new FileReader();
      setImgFile(e.target.files![0]);
      reader.onload = (event) => {
        setProfileImg(event.target?.result);
      };
      reader.readAsDataURL(e.target.files![0]);
    } else {
      setProfileImg(imgProfileUser === "default" ? imgUser : imgProfileUser);
    }
  };
  useEffect(() => {}, [profileImg]);
  return (
    <div className="settings-card">
      <h4 className="mb-5">Elige tu imagen</h4>
      <form onSubmit={handleImgUpload}>
        <DefaultImageProfile imgChild={profileImg} />
        <input
          type="file"
          className="inputUploadFile"
          accept="image/*"
          onChange={handleImgSelection}
        />
        <button type="submit" className="btn-upload-photo">
          Subir foto
        </button>
      </form>
    </div>
  );
};

export default UploadImageProfile;
