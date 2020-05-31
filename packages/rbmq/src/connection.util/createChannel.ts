import * as amqplib from "amqplib/callback_api";

export const createChannel = (connection: amqplib.Connection): Promise<amqplib.Channel> =>
  new Promise((resolve, reject) => {
    connection.createChannel((error, channel) => {
      if (error) {
        reject(error);
      } else {
        resolve(channel);
      }
    });
  });
