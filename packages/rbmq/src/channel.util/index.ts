import { ack } from "./ack";
import { assertExchange } from "./assertExchange";
import { assertQueue } from "./assertQueue";
import { bindExchange } from "./bindExchange";
import { bindQueue } from "./bindQueue";
import { checkExchange } from "./checkExchange";
import { checkQueue } from "./checkQueue";
import { close } from "./close";
import { consume } from "./consume";
import { createAck } from "./createAck";
import { deleteExchange } from "./deleteExchange";
import { deleteQueue } from "./deleteQueue";
import { publish } from "./publish";
import { sendToQueue } from "./sendToQueue";
import { toOnMessage } from "./toOnMessage";
import { toOnMessageWithAck } from "./toOnMessageWithAck";

export const ChannelUtil = {
  ack,
  assertExchange,
  assertQueue,
  bindExchange,
  bindQueue,
  checkExchange,
  checkQueue,
  close,
  consume,
  createAck,
  deleteExchange,
  deleteQueue,
  publish,
  sendToQueue,
  toOnMessage,
  toOnMessageWithAck,
};

Object.freeze(ChannelUtil);
