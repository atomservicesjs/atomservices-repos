import * as amqplib from "amqplib/callback_api";

export const consume = (
  channel: amqplib.Channel,
  queue: string,
  onMessage: (msg: amqplib.Message | null) => any,
  options?: amqplib.Options.Consume,
): Promise<amqplib.Replies.Consume> => new Promise((resolve, reject) =>
  channel.consume(queue, onMessage, options, (error, ok) => {
    if (error) {
      reject(error);
    } else {
      resolve(ok);
    }
  }));
