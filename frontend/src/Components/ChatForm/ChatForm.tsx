import React, { useState } from "react";
import Form from "react-bootstrap/Form";

interface Props {
  onStopInterval: () => void;
}

const ChatForm: React.FC<Props> = ({ onStopInterval }) => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const sendMessage = async () => {
    const url = "http://146.185.154.90:8000/messages";
    const data = new URLSearchParams();
    data.set("message", text);
    data.set("author", author);

    try {
      const response = await fetch(url, {
        method: "post",
        body: data,
      });

      if (response.ok) {
        onStopInterval();
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() !== "") {
      sendMessage();
      setText("");
      alert("Message sent successfully!");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Type your message</Form.Label>
          <Form.Control
            id="text"
            as="textarea"
            rows={3}
            value={text}
            onChange={handleChangeText}
            style={{ resize: "none" }}
          />
          <Form.Label>Type your name</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChangeAuthor}
          ></Form.Control>
        </Form.Group>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </Form>
    </>
  );
};

export default ChatForm;
