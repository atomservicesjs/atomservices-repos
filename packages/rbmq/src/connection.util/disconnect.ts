import * as amqplib from "amqplib/callback_api";

export const disconnect = (connection: amqplib.Connection): Promise<void> =>
  new Promise((resolve, reject) => {
    connection.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
