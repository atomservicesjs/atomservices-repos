import * as amqplib from "amqplib/callback_api";

export const bindExchange = (
  channel: amqplib.Channel,
  destination: string,
  source: string,
  pattern: string,
  args?: any,
): Promise<amqplib.Replies.Empty> => new Promise((resolve, reject) => {
  channel.bindExchange(destination, source, pattern, args, (error, ok) => {
    if (error) {
      reject(error);
    } else {
      resolve(ok);
    }
  });
});
