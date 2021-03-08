import React,{MouseEvent, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../../store/store';
import { EXCERCISE_SELECT_ITEM } from '../../../store/ui/ui.types';
import { ExcerciseType } from '../../../utils/enums';

interface ItemProps {
  id:string;
  type: number;
    text: string;
    image: string;
    color: string;
    onClickedItem:(e:MouseEvent)=>void;
}

const ItemQuizEditor:React.FC<ItemProps> = (props) => {

  const dispatch = useDispatch();

  const selectedOption = useSelector(
    (state: RootStore) => state.ui.excerciseSelectedItem
  );

  useEffect(() => {}, [selectedOption]);
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
    }
  };

    return (
        <div id={props.id} className={`option-quiz-editor ${props.color} ${selectedOption === props.type ? 'active' : ''}`} onClick={props.onClickedItem}>
          <div className="image">
            <img src={props.image} alt="" />
          </div>
          <div className="title">{props.text}</div>
        </div>
    )
}

export default ItemQuizEditor
