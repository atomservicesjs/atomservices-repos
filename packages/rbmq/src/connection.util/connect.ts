import * as amqplib from "amqplib/callback_api";

export const connect = (url: string, connectOptions?: any): Promise<amqplib.Connection> =>
  new Promise((resolve, reject) => {
    amqplib.connect(url, connectOptions, (error, connection) => {
      if (error) {
        reject(error);
      } else {
        resolve(connection);
      }
    });
  });
