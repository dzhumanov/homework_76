import React from "react";
import Card from "react-bootstrap/Card";
import { MessageProps } from "../../types";

const Message: React.FC<MessageProps> = ({ author, message, datetime }) => {
  const date = new Date(datetime);
  let seconds: number = date.getSeconds();
  let secondsString: string = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return (
    <Card className="mb-3 mt-3">
      <Card.Header className="d-flex justify-content-between">
        <h4>{author}</h4>
        <h4>
          Date: {date.getDate()}.{date.getMonth()},{" "}
          {date.getHours()}:{date.getMinutes()}:{secondsString}
        </h4>
      </Card.Header>
      <Card.Body>
        <Card.Text>{message}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Message;
