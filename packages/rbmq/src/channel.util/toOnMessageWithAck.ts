import * as amqplib from "amqplib/callback_api";
import { isNullOrUndefined } from "util";
import { createAck } from "./createAck";

export const toOnMessageWithAck = (
  channel: amqplib.Channel,
  process: (data: any, ack: () => void) => void,
) => (msg: any) => {
  let data: any = null;

  if (!isNullOrUndefined(msg)) {
    const text = msg.content.toString();
    data = JSON.parse(text);
  }

  const ack = createAck(channel, msg);

  process(data, ack);
};
