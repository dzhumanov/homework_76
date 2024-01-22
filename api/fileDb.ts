import { promises as fs } from "fs";
import { Message } from "./types";
import crypto from "crypto";

const fileName = "./db.json";

let data: Message[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },
  async getItems() {
    return data;
  },
  async addItem(item: Message) {
    const id = crypto.randomUUID();
    const message = { id, ...item };
    data.push(message);
    await this.save();

    return message;
  },
  async save() {
    return fs.writeFile(fileName, JSON.stringify(data));
  },
};

export default fileDb;