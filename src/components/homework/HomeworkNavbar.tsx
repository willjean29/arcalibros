import React,{MouseEvent, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import { MENU_EVALUATION_SELECT } from "../../store/ui/ui.types";


enum SelectionType{
  BANK=1,
  NEW=2,
}
const HomeworkNavbar = () => {
  const dispatch = useDispatch();

  const selectedOption = useSelector(
    (state: RootStore) => state.ui.menuEvaluationSelectedItem
  );

  useEffect(() => {}, [selectedOption]);

  const handleSelection = (e:MouseEvent)=>{
    e.preventDefault();
    switch(parseInt(e.currentTarget.id)){
      case SelectionType.BANK:
        dispatch({type:MENU_EVALUATION_SELECT,payload:SelectionType.BANK})
        break;
      case SelectionType.NEW:
        dispatch({type:MENU_EVALUATION_SELECT,payload:SelectionType.NEW})
        break;
    }
  }
  return (
    <div className="quiz-editor">
    <div className="quiz-editor-navbar">
      <h3>Editor</h3>
      <div className="quiz-editor-buttons">
        <div id="1" className={`${selectedOption === SelectionType.BANK ? 'btn-new-question active': 'btn-new-question'}`} onClick={handleSelection}>Banco de tareas</div>
        <div id="2" className={`${selectedOption === SelectionType.NEW ? 'btn-new-question active': 'btn-new-question'}`} onClick={handleSelection}>Nueva tarea</div>
      </div>
    </div>
    </div>
  );
};

export default HomeworkNavbar;
