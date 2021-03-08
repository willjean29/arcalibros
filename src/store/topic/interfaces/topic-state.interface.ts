import { Topic } from "./topic.interface";

export interface IState {
  topics: Topic[];
  createTopicError?: string[];
  selectedTopic?: Topic;
}
