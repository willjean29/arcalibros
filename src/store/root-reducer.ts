import { combineReducers } from "redux";
import { classroomReducer } from "./classroom/classroom.reducer";
import { examReducer } from "./exam/exam.reducer";
import { excerciseReducer } from "./excercise/excercise.reducer";
import { homeworkReducer } from "./homework/homework.reducer";
import { libraryReducer } from "./library/library.reducer";
import { messagingReducer } from "./messaging/messaging.reducer";
import { topicReducer } from "./topic/topic.reducer";
import { uiReducer } from "./ui/ui.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  messaging: messagingReducer,
  classroom: classroomReducer,
  topic: topicReducer,
  excercise: excerciseReducer,
  exam: examReducer,
  homework: homeworkReducer,
  library: libraryReducer,
});
