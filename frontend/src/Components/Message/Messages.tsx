import React, { useEffect, useRef, useState } from "react";
import { MessageProps } from "../../types";
import Message from "./Message";

interface Props {
  Messages: MessageProps[];
}

const Messages: React.FC<Props> = ({ Messages }) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [prevMessagesLength, setPrevMessagesLength] = useState<number>(0);

  useEffect(() => {
    if (messagesContainerRef.current && Messages.length > prevMessagesLength) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;

      setPrevMessagesLength(Messages.length);
    }
  }, [Messages, prevMessagesLength]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
      setPrevMessagesLength(Messages.length);
    }
  }, [Messages]);

  return (
    <div
      ref={messagesContainerRef}
      style={{ maxHeight: "440px", overflowY: "auto" }}
    >
      {Messages.map((messageItem) => (
        <Message
          key={Math.random()}
          author={messageItem.author}
          message={messageItem.message}
          datetime={messageItem.datetime}
        />
      ))}
    </div>
  );
};

export default Messages;
