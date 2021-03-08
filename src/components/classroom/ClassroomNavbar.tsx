import React, { MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootStore } from "../../store/store";
import { menuClassroomSelectionItem } from "../../store/ui/ui.actions";
import { MENU_CLASSROOM_SELECT } from "../../store/ui/ui.types";

enum SelectionType {
  HOME = 1,
  TOPICS = 2,
  PARTICIPANTS = 3,
  WORKGROUPS = 4,
  EVALUATIONS = 5,
  EVENTS = 6,
}

const ClassroomNavbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const menuSelectedItem = useSelector(
    (state: RootStore) => state.ui.menuClassroomSelectedItem
  );
  useEffect(() => {
    dispatch({
      type: MENU_CLASSROOM_SELECT,
      payload: 1,
    });
  }, [location]);
  useEffect(() => {}, [menuSelectedItem]);
  const handleSelection = (e: MouseEvent) => {
    e.preventDefault();
    switch (parseInt(e.currentTarget.id)) {
      case SelectionType.HOME:
        dispatch(menuClassroomSelectionItem(SelectionType.HOME));
        break;
      case SelectionType.TOPICS:
        dispatch(menuClassroomSelectionItem(SelectionType.TOPICS));
        break;
      case SelectionType.PARTICIPANTS:
        dispatch(menuClassroomSelectionItem(SelectionType.PARTICIPANTS));
        break;
      case SelectionType.WORKGROUPS:
        dispatch(menuClassroomSelectionItem(SelectionType.WORKGROUPS));
        break;
      case SelectionType.EVALUATIONS:
        dispatch(menuClassroomSelectionItem(SelectionType.EVALUATIONS));
        break;
        case SelectionType.EVENTS:
        dispatch(menuClassroomSelectionItem(SelectionType.EVENTS));
        break;
    }
  };
  return (
    <div className="classroom-navbar">
      <button
        id="1"
        className={
          menuSelectedItem === SelectionType.HOME || menuSelectedItem === null
            ? "active"
            : undefined
        }
        onClick={handleSelection}
      >
        Inicio
      </button>
      <button
        id="2"
        className={
          menuSelectedItem === SelectionType.TOPICS ? "active" : undefined
        }
        onClick={handleSelection}
      >
        Temas
      </button>
      <button
        id="3"
        className={
          menuSelectedItem === SelectionType.PARTICIPANTS ? "active" : undefined
        }
        onClick={handleSelection}
      >
        Participantes
      </button>
      <button
        id="4"
        className={
          menuSelectedItem === SelectionType.WORKGROUPS ? "active" : undefined
        }
        onClick={handleSelection}
      >
        Grupos
      </button>
      <button
        id="5"
        className={
          menuSelectedItem === SelectionType.EVALUATIONS ? "active" : undefined
        }
        onClick={handleSelection}
      >
        Evaluaciones
      </button>
      <button
        id="6"
        className={
          menuSelectedItem === SelectionType.EVENTS ? "active" : undefined
        }
        onClick={handleSelection}
      >
        Eventos
      </button>
    </div>
  );
};

export default ClassroomNavbar;
