import * as amqplib from "amqplib/callback_api";

export const deleteExchange = (
  channel: amqplib.Channel,
  exchange: string,
  options?: amqplib.Options.DeleteExchange,
): Promise<amqplib.Replies.Empty> => new Promise((resolve, reject) => {
  channel.deleteExchange(exchange, options, (error, ok) => {
    if (error) {
      reject(error);
    } else {
      resolve(ok);
    }
  });
});
