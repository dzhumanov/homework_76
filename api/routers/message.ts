import { Router } from "express";
import fileDb from "../fileDb";

const messageRouter = Router();

messageRouter.get("/", async (req, res) => {
  const datetime = req.query.datetime as string;

  if (!datetime) {
    const messages = await fileDb.getItems();
    return res.send(messages);
  }

  const parsedDatetime = new Date(datetime);
  if (isNaN(parsedDatetime.getTime())) {
    return res.status(400).json({ error: "Invalid datetime!" });
  }

  const messages = await fileDb.getItems({ datetime: { $gt: parsedDatetime } });
  res.send(messages);
});

messageRouter.post("/", async (req, res) => {
  const { author, message } = req.body;

  if (!author || !message || author.trim() === "" || message.trim() === "") {
    return res
      .status(400)
      .json({ error: "Author and message must be present in the request" });
  }

  const messageObj = {
    author,
    message,
  };

  const newMessage = await fileDb.addItem(messageObj);
  res.send(newMessage);
});

export default messageRouter;
