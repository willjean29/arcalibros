import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadHomeworks } from "../../../store/homework/homework.actions";
import { RootStore } from "../../../store/store";
import ItemHomeworkBank from "./ItemHomeworkBank";
import SelectHomeworkBank from "./SelectHomeworkBank";

const HomeworkBank = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const teacherId = useSelector(
    (state: RootStore) => state.user.user?._id as string
  );
  const homeworks = useSelector((state: RootStore) => state.homework.homeworks);
  useEffect(() => {
    dispatch(loadHomeworks(teacherId));
  }, [location]);

  return (
    <div>
      <SelectHomeworkBank />

      {homeworks &&
        homeworks.map((homework, index) => (
          <ItemHomeworkBank homework={homework} key={index} />
        ))}
    </div>
  );
};

export default HomeworkBank;
