import React, { MouseEvent } from "react";
import ItemQuizEditor from "./ItemQuizEditor";

import imgOption from "../../../assets/images/option.png";
import imgFill from "../../../assets/images/fill.png";
import imgDrag from "../../../assets/images/drag.png";
import { useDispatch } from "react-redux";
import { EXCERCISE_SELECT_ITEM } from "../../../store/ui/ui.types";

enum ExcerciseType {
  SELECTION = 1,
  DRAGDROP = 2,
  FILLBLANK = 3,
  SELECTION_IMAGES = 4,
}
const MenuEditor = () => {
  const dispatch = useDispatch();
  const handleSelection = (e: MouseEvent) => {
    e.preventDefault();
    switch (parseInt(e.currentTarget.id)) {
      case ExcerciseType.SELECTION:
        dispatch({
          type: EXCERCISE_SELECT_ITEM,
          payload: ExcerciseType.SELECTION,
        });
        break;
      case ExcerciseType.DRAGDROP:
        dispatch({
          type: EXCERCISE_SELECT_ITEM,
          payload: ExcerciseType.DRAGDROP,
        });
        break;
      case ExcerciseType.FILLBLANK:
        dispatch({
          type: EXCERCISE_SELECT_ITEM,
          payload: ExcerciseType.FILLBLANK,
        });
        break;
      case ExcerciseType.SELECTION_IMAGES:
        dispatch({
          type: EXCERCISE_SELECT_ITEM,
          payload: ExcerciseType.SELECTION_IMAGES,
        });
        break;
    }
  };
  return (
    <div className="options-quiz-editor">
      <ItemQuizEditor
        id="1"
        type={ExcerciseType.SELECTION}
        text="Opción multiple"
        color="green"
        image={imgOption}
        onClickedItem={handleSelection}
      />
      <ItemQuizEditor
        id="2"
        type={ExcerciseType.DRAGDROP}
        text="Arrastar"
        color="violet"
        image={imgDrag}
        onClickedItem={handleSelection}
      />
      <ItemQuizEditor
        id="3"
        type={ExcerciseType.FILLBLANK}
        text="Completar"
        color="blue"
        image={imgFill}
        onClickedItem={handleSelection}
      />
      <ItemQuizEditor
        id="4"
        type={ExcerciseType.SELECTION_IMAGES}
        text="Opcion multiple Imagenes"
        color="red"
        image={imgOption}
        onClickedItem={handleSelection}
      />
    </div>
  );
};

export default MenuEditor;
