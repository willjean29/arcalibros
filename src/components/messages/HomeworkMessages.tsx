import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import { Message } from "../../store/messaging/interfaces/message.interface";
import { loadReceivedMessages } from "../../store/messaging/messaging.actions";
import { MESSAGE_UNLOAD } from "../../store/messaging/messaging.types";
import { RootStore } from "../../store/store";
import ReceivedItem from "./ReceivedItem";

const HomeworkMessages = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userEmail = useSelector((state: RootStore) => state.user.user?.email);
  useEffect(() => {
    dispatch(loadReceivedMessages(userEmail as string));
    dispatch({
      type: MESSAGE_UNLOAD,
    });
  }, [location]);
  const receivedMessages = useSelector(
    (state: RootStore) => state.messaging.receivedMessages
  );

  return (
    <div>
      {receivedMessages &&
        receivedMessages
          .reverse()
          .filter((message) => message.sender === "ARCA VIRTUAL")
          .map((message: Message, index: number) => (
            <ReceivedItem key={index} message={message} />
          ))}
    </div>
  );
};

export default HomeworkMessages;
