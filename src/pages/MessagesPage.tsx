import React, { useState, MouseEvent, useEffect } from "react";

import ReceivedMessages from "../components/messages/ReceivedMessages";
import SendedMessages from "../components/messages/SendedMessages";
import imgSended from "../assets/images/sended.png";
import imgReceived from "../assets/images/received.png";
import imgHomework from "../assets/images/tasks.png";
import Modal from "../components/modal/Modal";
import MessageMenuOption from "../components/messages/MessageMenuOption";
import { MessageItem, UserType } from "../utils/enums";
import { useDispatch, useSelector } from "react-redux";
import { MESSAGES_SELECT_ITEM } from "../store/ui/ui.types";
import { RootStore } from "../store/store";
import HomeworkMessages from "../components/messages/HomeworkMessages";
import ButtonRedactEmail from "../components/messages/ButtonRedactEmail";
import ModalRedactEmail from "../components/modal/ModalRedactEmail";

const MessagesPage = () => {
  const dispatch = useDispatch();
  const selectedOption = useSelector(
    (state: RootStore) => state.ui.messagesSelectedItem
  );
  const userType = useSelector(
    (state: RootStore) => state.user.user?.type as number
  );
  const [modalRedactEmail, setModalRedactEmail] = useState(false);
  useEffect(() => {}, [selectedOption]);
  const handleReceived = (e: MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: MESSAGES_SELECT_ITEM,
      payload: MessageItem.Received,
    });
  };
  const handleSended = (e: MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: MESSAGES_SELECT_ITEM,
      payload: MessageItem.Sended,
    });
  };
  const handleHomework = (e: MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: MESSAGES_SELECT_ITEM,
      payload: MessageItem.Homework,
    });
  };

  return (
    <div className="quiz-editor">
      <Modal modalOpen={modalRedactEmail}>
        <ModalRedactEmail setModalOpen={setModalRedactEmail} />
      </Modal>
      <div className="messages-page">
        <div className="header-messages-page">
          <MessageMenuOption
            name={MessageItem.Received}
            onClickedOption={handleReceived}
            img={imgReceived}
          />
          <MessageMenuOption
            name={MessageItem.Sended}
            onClickedOption={handleSended}
            img={imgSended}
          />
          {userType === UserType.STUDENT && (
            <MessageMenuOption
              name={MessageItem.Homework}
              onClickedOption={handleHomework}
              img={imgHomework}
            />
          )}
        </div>
        <div className="messages-container">
          {selectedOption === MessageItem.Received && <ReceivedMessages />}
          {selectedOption === MessageItem.Sended && <SendedMessages />}
          {selectedOption === MessageItem.Homework && <HomeworkMessages />}
        </div>
      </div>
      <ButtonRedactEmail handleRedact={() => setModalRedactEmail(true)} />
    </div>
  );
};

export default MessagesPage;
