import * as amqplib from "amqplib/callback_api";

export const checkExchange = (
  channel: amqplib.Channel,
  exchange: string,
): Promise<amqplib.Replies.Empty> => new Promise((resolve, reject) => {
  channel.checkExchange(exchange, (error, ok) => {
    if (error) {
      reject(error);
    } else {
      resolve(ok);
    }
  });
});
