import React from "react";
import { useSelector } from "react-redux";

import StreammingJutsu from "../components/streamming/StreammingJutsu";
import StreammingJutsuGroup from "../components/streamming/StreammingJutsuGroup";
import { RootStore } from "../store/store";

interface Props {
  classroomId: string ;
}

const StreammingGroupPage: React.FC<Props> = ({classroomId}) => {
  const user = useSelector((state: RootStore) => state.user.user);
  const profileImg = useSelector(
    (state: RootStore) => state.user.profileImg
  ) as string;
  const classrooms = useSelector(
    (state: RootStore) => state.classroom.classrooms
  );

  const name = `${user?.firstName} ${user?.lastName}`;
  console.info("aaa",profileImg);
  return (
    <div className="streamming-page">
      <div className="streamming-page-container global-container">
        <StreammingJutsuGroup name={name} profileImg={profileImg} classroom={classroomId} />
      </div>
    </div>
  );
};

export default StreammingGroupPage;
