import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Message } from "../../types";
import axiosApi from "../../axiosApi";
import { Paper } from "@mui/material";

interface Props {
  onStopInterval: () => void;
}

const ChatForm: React.FC<Props> = ({ onStopInterval }) => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const sendMessage = async () => {
    const messageObj: Message = {
      author: author,
      message: text,
    };
    await axiosApi.post("/messages", messageObj);
    onStopInterval();
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
    <Paper elevation={3} style={{ padding: 20, marginTop: '30px', backgroundColor: "white" }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            id="text"
            label="Type your message"
            multiline
            rows={3}
            value={text}
            onChange={handleChangeText}
            fullWidth
            style={{ resize: "none" }}
          />
          <TextField
            id="author"
            label="Type your name"
            type="text"
            value={author}
            onChange={handleChangeAuthor}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default ChatForm;
