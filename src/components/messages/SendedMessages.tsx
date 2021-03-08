import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Message } from "../../store/messaging/interfaces/message.interface";
import { loadSendedMessages } from "../../store/messaging/messaging.actions";
import { MESSAGE_UNLOAD } from "../../store/messaging/messaging.types";
import { RootStore } from "../../store/store";

import SendedItem from "./SendedItem";

const SendedMessages = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userEmail = useSelector((state: RootStore) => state.user.user?.email);
  useEffect(() => {
    dispatch(loadSendedMessages(userEmail as string));
    dispatch({
      type: MESSAGE_UNLOAD,
    });
  }, [location]);
  const sendedMessages = useSelector(
    (state: RootStore) => state.messaging.sendedMessages
  );
  return (
    <div>
      {sendedMessages &&
        sendedMessages
          .reverse()
          .map((message: Message, index: number) => (
            <SendedItem key={index} message={message} />
          ))}
    </div>
  );
};

export default SendedMessages;
