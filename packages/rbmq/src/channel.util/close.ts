import * as amqplib from "amqplib/callback_api";

export const close = (channel: amqplib.Channel): Promise<void> =>
  new Promise((resolve, reject) => {
    channel.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
