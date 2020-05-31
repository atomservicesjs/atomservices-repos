import * as amqplib from "amqplib/callback_api";

export const checkQueue = (
  channel: amqplib.Channel,
  queue: string,
): Promise<amqplib.Replies.AssertQueue> => new Promise((resolve, reject) => {
  channel.checkQueue(queue, (error, ok) => {
    if (error) {
      reject(error);
    } else {
      resolve(ok);
    }
  });
});
