import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../../store/store";
import FormEditorDnD from "../quiz-editor/FormEditorDnD";
import FormEditorFillBlank from "../quiz-editor/FormEditorFillBlank";
import FormEditorSelection from "../quiz-editor/FormEditorSelection";
import FormEditorSelectionImages from "../quiz-editor/FormEditorSelectionImages";


enum ExcerciseType {
  SELECTION = 1,
  DRAGDROP = 2,
  FILLBLANK = 3,
  SELECTION_IMAGES = 4,
}
const Preview = () => {
  const selectedItem = useSelector(
    (state: RootStore) => state.ui.excerciseSelectedItem
  );

  useEffect(()=>{
    
  },[selectedItem])
  
  return (
    <div>
    {selectedItem===ExcerciseType.SELECTION && <div className="quiz-editor-and-preview">
        <FormEditorSelection />
        
      </div>}

      {selectedItem===ExcerciseType.DRAGDROP && <div className="quiz-editor-and-preview">
        <FormEditorDnD />
        
      </div>}

      {selectedItem===ExcerciseType.FILLBLANK && <div className="quiz-editor-and-preview">
        <FormEditorFillBlank />
       
      </div>}
      {selectedItem===ExcerciseType.SELECTION_IMAGES && <div className="quiz-editor-and-preview">
        <FormEditorSelectionImages />
       
      </div>}
  </div>
  )

};

export default Preview;
