import { useState, useCallback, useEffect} from "react";
import ChatForm from "./Components/ChatForm/ChatForm";
import Messages from "./Components/Message/Messages";
import { MessageProps } from "./types";

const url: string = "http://146.185.154.90:8000/messages";

function App() {
  const [messages, setMessages] = useState<MessageProps[]>();
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const fetchMessages = useCallback(async (url: string): Promise<void> => {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setMessages(data);
    }
  }, []);

  useEffect(() => {
    void fetchMessages(url);
  }, [fetchMessages]);

  const startInterval = () => {
    const id = setInterval(() => {
      void fetchMessages(url);
    }, 3000);
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
      <ChatForm onStopInterval={stopInterval} />
    </div>
  );
}

export default App;
