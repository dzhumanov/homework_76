import { useState, useCallback, useEffect } from "react";
import ChatForm from "./Components/ChatForm/ChatForm";
import Messages from "./Components/Message/Messages";
import { MessageProps } from "./types";
import axiosApi from "./axiosApi";

const url: string = "/messages";

function App() {
  const [messages, setMessages] = useState<MessageProps[]>();
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const fetchMessages = useCallback(async (url: string): Promise<void> => {
    const response = await axiosApi.get(url);
    setMessages(response.data);
  }, []);

  useEffect(() => {
    void fetchMessages(url);
  }, [fetchMessages]);

  const startInterval = () => {
    const id = setInterval(() => {
      void fetchMessages(url);
    }, 5000);
    setIntervalId(id);
  };

  const stopInterval = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    void fetchMessages(url);
    startInterval();

    return () => {
      stopInterval();
    };
  }, [fetchMessages]);

  return (
    <div className="container w-50 pt-3">
      <Messages Messages={messages || []} />
      <ChatForm/>
    </div>
  );
}

export default App;
