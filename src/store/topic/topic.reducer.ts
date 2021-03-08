import { IState } from "./interfaces/topic-state.interface";
import { Topic } from "./interfaces/topic.interface";
import {
  TopicDispatchTypes,
  TOPIC_LOAD,
  TOPIC_NEW,
  TOPIC_UPDATE,
} from "./topic.types";

const defaultState: IState = {
  topics: [] as Topic[],
};

export const topicReducer = (
  state: IState = defaultState,
  action: TopicDispatchTypes
) => {
  switch (action.type) {
    case TOPIC_NEW:
      return { ...state, topics: [...state.topics, action.payload] };
    case TOPIC_LOAD:
      return { ...state, selectedTopic: action.payload };
    case TOPIC_UPDATE:
      return { ...state, selectedTopic: action.payload };
    default:
      return state;
  }
};
