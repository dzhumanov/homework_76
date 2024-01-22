import { promises as fs } from "fs";
import { Message, MessageShort } from "./types";
import crypto from "crypto";

const fileName = "./db.json";

let data: Message[] = [];

type Filter = {
  datetime?: {
    $gt: Date;
  };
};

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },
  async getItems(filter?: Filter) {
    if (!filter || !filter.datetime) {
      return data.slice(0, 30);
    }

    const filteredMessages = data.filter((message) => {
      const messageDate = new Date(message.date);
      return messageDate > filter.datetime!.$gt;
    });

    return filteredMessages.slice(0, 30);
  },
  async addItem(item: MessageShort) {
    const id = crypto.randomUUID();
    const date = new Date().toISOString();
    const message = { id, date, ...item };
    data.push(message);
    await this.save();

    return message;
  },
  async save() {
    return fs.writeFile(fileName, JSON.stringify(data));
  },
};

export default fileDb;
