import * as amqplib from "amqplib/callback_api";

export const deleteQueue = (
  channel: amqplib.Channel,
  queue: string,
  options?: amqplib.Options.DeleteQueue,
): Promise<amqplib.Replies.DeleteQueue> => new Promise((resolve, reject) => {
  channel.deleteQueue(queue, options, (error, ok) => {
    if (error) {
      reject(error);
    } else {
      resolve(ok);
    }
  });
});
