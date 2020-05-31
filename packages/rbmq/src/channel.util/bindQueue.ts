import * as amqplib from "amqplib/callback_api";

export const bindQueue = (
  channel: amqplib.Channel,
  queue: string,
  source: string,
  pattern: string,
  args?: any,
): Promise<amqplib.Replies.Empty> => new Promise((resolve, reject) => {
  channel.bindQueue(queue, source, pattern, args, (error, ok) => {
    if (error) {
      reject(error);
    } else {
      resolve(ok);
    }
  });
});
