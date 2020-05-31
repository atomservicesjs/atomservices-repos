import * as amqplib from "amqplib/callback_api";

export const createAck = (
  channel: amqplib.Channel,
  message: amqplib.Message,
  allUpTo?: boolean,
) => ((Channel, Message, AllUpTo) => () => Channel.ack(Message, AllUpTo))(channel, message, allUpTo);
