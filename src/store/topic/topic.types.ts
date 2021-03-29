import { Topic } from "./interfaces/topic.interface";

export const TOPIC_NEW = "TOPIC_NEW";
export const TOPIC_LOAD = "TOPIC_LOAD";
export const TOPIC_LOAD_ERROR = "TOPIC_LOAD_ERROR";
export const TOPIC_CREATE_ERROR = "TOPIC_CREATE_ERROR";
export const TOPIC_UPDATE = "TOPIC_UPDATE";
export const TOPIC_ADD_COMMENT = "TOPIC_ADD_COMMENT";
export const TOPIC_DELETE_COMMENT = "TOPIC_DELETE_COMMENT";
export const topicsUrl = "http://localhost:4000/topics/";
export interface TopicNew {
  type: typeof TOPIC_NEW;
  payload: Topic;
}

export interface TopicCreateError {
  type: typeof TOPIC_CREATE_ERROR;
  payload: string[];
}

export interface LoadTopic {
  type: typeof TOPIC_LOAD;
  payload: Topic;
}

export interface LoadTopicError {
  type: typeof TOPIC_LOAD_ERROR;
  payload: undefined;
}

export interface TopicUpdate {
  type: typeof TOPIC_UPDATE;
  payload: Topic;
}

export interface TopicAddComment {
  type: typeof TOPIC_ADD_COMMENT;
}

export interface TopicDeleteComment {
  type: typeof TOPIC_DELETE_COMMENT;
}

export type TopicDispatchTypes =
  | TopicNew
  | TopicCreateError
  | LoadTopic
  | LoadTopicError
  | TopicUpdate
  | TopicAddComment
  | TopicDeleteComment;
