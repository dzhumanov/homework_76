import express from "express";
import messageRouter from "./routers/message";
import cors from "cors";
import fileDb from "./fileDb";

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use("/messages", messageRouter);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

void run();
