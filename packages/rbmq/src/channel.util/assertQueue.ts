import * as amqplib from "amqplib/callback_api";

export const assertQueue = (
  channel: amqplib.Channel,
  queue?: string,
  options?: amqplib.Options.AssertQueue,
): Promise<amqplib.Replies.AssertQueue> => new Promise((resolve, reject) =>
  channel.assertQueue(queue, options, (error, ok) => {
    if (error) {
      reject(error);
    } else {
      resolve(ok);
    }
  }));
