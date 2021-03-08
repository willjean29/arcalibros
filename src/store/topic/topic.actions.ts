import { TopicDto } from "./dtos/topic.dto";
import axios, { AxiosError } from "axios";
import {
  TopicDispatchTypes,
  topicsUrl,
  TOPIC_ADD_COMMENT,
  TOPIC_CREATE_ERROR,
  TOPIC_DELETE_COMMENT,
  TOPIC_LOAD,
  TOPIC_LOAD_ERROR,
  TOPIC_NEW,
  TOPIC_UPDATE,
} from "./topic.types";
import { Dispatch } from "redux";
import { RootStore } from "../store";
import { Topic } from "./interfaces/topic.interface";
import { TopicComment } from "./interfaces/topic-comment.interface";

export const topicCreate = (topicDto: TopicDto) => async (
  dispatch: Dispatch<TopicDispatchTypes>
) => {
  try {
    const res = await axios.post(topicsUrl.concat("create"), topicDto);
    dispatch({
      type: TOPIC_NEW,
      payload: res.data.topic,
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    dispatch({
      type: TOPIC_CREATE_ERROR,
      payload: errorAxios.response?.data.message,
    });
  }
};

export const loadTopic = (topicId: string) => async (
  dispatch: Dispatch<TopicDispatchTypes>
) => {
  try {
    const res = await axios.get(topicsUrl.concat(topicId));
    console.log(res.data.topic);
    dispatch({
      type: TOPIC_LOAD,
      payload: res.data.topic,
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    dispatch({
      type: TOPIC_LOAD_ERROR,
      payload: errorAxios.response?.data.message,
    });
  }
};

export const updateTopic = (newTopic: Topic) => async (
  dispatch: Dispatch<TopicDispatchTypes>,
  getState: () => RootStore
) => {
  const selectedTopic = getState().topic.selectedTopic;

  if (selectedTopic && newTopic._id === selectedTopic._id) {
    console.log("actualiza");
    dispatch({
      type: TOPIC_UPDATE,
      payload: newTopic,
    });
  }
};

export const addTopicComment = (
  comment: TopicComment,
  topicId: string
) => async (dispatch: Dispatch<TopicDispatchTypes>) => {
  try {
    const res = await axios.post(
      topicsUrl.concat(`addcomment/${topicId}`),
      comment
    );

    dispatch({
      type: TOPIC_ADD_COMMENT,
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.response?.data.message);
  }
};

export const deleteTopicComment = (
  comment: TopicComment,
  topicId: string
) => async (dispatch: Dispatch<TopicDispatchTypes>) => {
  try {
    const res = await axios.post(
      topicsUrl.concat(`removecomment/${topicId}`),
      comment
    );

    dispatch({
      type: TOPIC_DELETE_COMMENT,
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios.response?.data.message);
  }
};
