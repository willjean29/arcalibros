import React,{MouseEvent, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../../store/store";
import { MENU_EXCERCISE_SELECT } from "../../../store/ui/ui.types";


enum SelectionType{
  ARCA=1,
  EDIT=2,
  NEW=3
}
const NavBarEditor = () => {
  const dispatch = useDispatch();

  const selectedOption = useSelector(
    (state: RootStore) => state.ui.menuExcerciseSelectedItem
  );

  useEffect(() => {}, [selectedOption]);

  const handleSelection = (e:MouseEvent)=>{
    e.preventDefault();
    switch(parseInt(e.currentTarget.id)){
      // case SelectionType.ARCA:
      //   dispatch({type:MENU_EXCERCISE_SELECT,payload:SelectionType.ARCA})
      //   break;
      case SelectionType.EDIT:
        dispatch({type:MENU_EXCERCISE_SELECT,payload:SelectionType.EDIT})
        break;
      case SelectionType.NEW:
        dispatch({type:MENU_EXCERCISE_SELECT,payload:SelectionType.NEW})
        break;
    }
  }
  return (
    <div className="quiz-editor-navbar">
      <h3>Editor</h3>
      <div className="quiz-editor-buttons">
        <div id="2" className={`${selectedOption === SelectionType.EDIT ? 'btn-new-question active': 'btn-new-question'}`} onClick={handleSelection}>Ejercicios</div>
        <div id="3" className={`${selectedOption === SelectionType.NEW ? 'btn-new-question active': 'btn-new-question'}`} onClick={handleSelection}>Nuevo Ejercicio</div>
        {/* <div id="1" className={`${selectedOption === SelectionType.ARCA ? 'btn-new-question active': 'btn-new-question'}`} onClick={handleSelection}>Ejercicios Arca</div> */}
      </div>
    </div>
  );
};

export default NavBarEditor;
