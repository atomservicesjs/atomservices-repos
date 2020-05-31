import * as amqplib from "amqplib/callback_api";
import { ExchangeTypes } from "../ExchangeTypes";

export const assertExchange = (
  channel: amqplib.Channel,
  exchange: string,
  type: ExchangeTypes,
  options?: amqplib.Options.AssertExchange,
): Promise<amqplib.Replies.AssertExchange> => new Promise((resolve, reject) =>
  channel.assertExchange(exchange, type, options, (error, ok) => {
    if (error) {
      reject(error);
    } else {
      resolve(ok);
    }
  }));
