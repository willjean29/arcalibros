import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootStore } from "../../../store/store";
import { MENU_EXCERCISE_SELECT } from "../../../store/ui/ui.types";

import Preview from "../preview/Preview";
import ArcaExcercise from "./ArcaExcercise";
import EditExcercise from "./EditExcercise";
import MenuEditor from "./MenuEditor";
import NavBarEditor from "./NavBarEditor";

enum SelectionType {
  ARCA = 1,
  EDIT = 2,
  NEW = 3,
}
const QuizEditor = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const menuSelectedItem = useSelector(
    (state: RootStore) => state.ui.menuExcerciseSelectedItem
  );
  useEffect(() => {
    dispatch({
      type: MENU_EXCERCISE_SELECT,
      payload: SelectionType.NEW,
    });
  }, [location]);
  return (
    <div className="quiz-editor">
      <NavBarEditor />
      {menuSelectedItem === SelectionType.NEW && (
        <div>
          <MenuEditor /> <Preview />
        </div>
      )}
      {menuSelectedItem === SelectionType.EDIT && <EditExcercise />}
      {menuSelectedItem === SelectionType.ARCA && <ArcaExcercise />}
    </div>
  );
};

export default QuizEditor;
