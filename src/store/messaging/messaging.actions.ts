import { Dispatch } from "redux";
import { RootStore } from "../store";
import {
  MESSAGES_LOAD_RECEIVED,
  MESSAGES_LOAD_SENDED,
  MESSAGE_LOAD,
  MESSAGE_NEW,
  MESSAGE_RECEIVE_NEW,
  MESSAGE_SEND_ERROR,
  MESSAGE_SET_READ,
  MessagingDispatchTypes,
  messagingURL,
} from "./messaging.types";
import axios, { AxiosError } from "axios";

import { MessageDto } from "./dtos/message.dto";
import { Message } from "./interfaces/message.interface";

export const newMessage = (message: MessageDto) => async (
  dispatch: Dispatch<MessagingDispatchTypes>
) => {
  try {
    const res = await axios.post(messagingURL, message);

    dispatch({
      type: MESSAGE_NEW,
      payload: undefined,
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    dispatch({
      type: MESSAGE_SEND_ERROR,
      payload: errorAxios.response?.data.message,
    });
  }
};

export const loadReceivedMessages = (userEmail: string) => async (
  dispatch: Dispatch<MessagingDispatchTypes>
) => {
  try {
    const res = await axios.get(messagingURL.concat(`received/${userEmail}`));
    dispatch({
      type: MESSAGES_LOAD_RECEIVED,
      payload: res.data.messages,
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios);
  }
};

export const loadSendedMessages = (userEmail: string) => async (
  dispatch: Dispatch<MessagingDispatchTypes>
) => {
  try {
    const res = await axios.get(messagingURL.concat(`sended/${userEmail}`));
    dispatch({
      type: MESSAGES_LOAD_SENDED,
      payload: res.data.messages,
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios);
  }
};

export const loadMessage = (messageId: string) => async (
  dispatch: Dispatch<MessagingDispatchTypes>
) => {
  try {
    const res = await axios.get(messagingURL.concat(messageId));
    dispatch({
      type: MESSAGE_LOAD,
      payload: res.data.message,
    });
  } catch (error) {
    const errorAxios: AxiosError = error;
    console.log(errorAxios);
  }
};

export const messageSetRead = (messageId: string) => async (
  dispatch: Dispatch<MessagingDispatchTypes>
) => {
  try {
    const res = await axios.post(messagingURL.concat(`read/${messageId}`));
    dispatch({
      type: MESSAGE_SET_READ,
    });
  } catch (error) {}
};

export const messageReceiveNew = (message: Message) => async (
  dispatch: Dispatch<MessagingDispatchTypes>
) => {
  dispatch({
    type: MESSAGE_RECEIVE_NEW,
    payload: message,
  });
};
