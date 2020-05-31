import * as amqplib from "amqplib/callback_api";

export const sendToQueue = (
  channel: amqplib.Channel,
  queue: string,
  content: Buffer,
  options?: amqplib.Options.Publish,
): boolean => channel.sendToQueue(queue, content, options);
