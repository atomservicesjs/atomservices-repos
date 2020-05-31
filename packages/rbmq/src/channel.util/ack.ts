import * as amqplib from "amqplib/callback_api";

export const ack = (
  channel: amqplib.Channel,
  message: amqplib.Message,
  allUpTo?: boolean,
) => channel.ack(message, allUpTo);
