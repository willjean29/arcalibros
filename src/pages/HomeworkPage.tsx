import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import EvaluationNavbar from "../components/evaluations/EvaluationNavbar";
import HomeworkBank from "../components/homework/homework-bank/HomeworkBank";
import HomeworkEditor from "../components/homework/homework-editor/HomeworkEditor";
import HomeworkNavbar from "../components/homework/HomeworkNavbar";
import { loadExcercises } from "../store/excercise/excercise.actions";
import { RootStore } from "../store/store";
import { MENU_EVALUATION_SELECT } from "../store/ui/ui.types";

enum SelectionType {
  BANK = 1,
  NEW = 2,
  GRADES = 3,
}

const HomeworkPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const teacherId = useSelector((state: RootStore) => state.user.user?._id);
  const menuSelectedItem = useSelector(
    (state: RootStore) => state.ui.menuEvaluationSelectedItem
  );

  useEffect(() => {
    dispatch({
      type: MENU_EVALUATION_SELECT,
      payload: SelectionType.NEW,
    });
    dispatch(loadExcercises(teacherId as string));
  }, [location]);

  return (
    <div className="evaluations-page">
      <div className="evaluations-page-container global-container">
        <HomeworkNavbar />

        {menuSelectedItem === SelectionType.BANK && <HomeworkBank />}
        {menuSelectedItem === SelectionType.NEW && <HomeworkEditor />}
        {menuSelectedItem === SelectionType.GRADES && <h1>GRADES</h1>}
      </div>
    </div>
  );
};

export default HomeworkPage;
