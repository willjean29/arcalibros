import React from "react";
import { useSelector } from "react-redux";

import StreammingJutsu from "../components/streamming/StreammingJutsu";
import { RootStore } from "../store/store";

const StreammingPage = () => {
  const user = useSelector((state: RootStore) => state.user.user);
  const profileImg = useSelector(
    (state: RootStore) => state.user.profileImg
  ) as string;
  const classrooms = useSelector(
    (state: RootStore) => state.classroom.classrooms
  );
  const name = `${user?.firstName} ${user?.lastName}`;
  return (
    <div className="streamming-page">
      <div className="streamming-page-container global-container">
        <StreammingJutsu name={name} profileImg={profileImg} classroom={classrooms} />
      </div>
    </div>
  );
};

export default StreammingPage;
