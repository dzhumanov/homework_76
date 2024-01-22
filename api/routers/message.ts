import { Router } from "express";
import fileDb from "../fileDb";

const messageRouter = Router();


messageRouter.get('/', async (req, res) => {
    const messages = await fileDb.getItems();
    res.send(messages);
})

messageRouter.post("/", async (req, res) => {
  const messageObj = {
    author: req.body.author,
    message: req.body.message,
  };

  const newMessage = await fileDb.addItem(messageObj);
  res.send(newMessage);
});

export default messageRouter;