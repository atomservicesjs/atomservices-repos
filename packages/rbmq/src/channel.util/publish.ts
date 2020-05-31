import * as amqplib from "amqplib/callback_api";

export const publish = (
  channel: amqplib.Channel,
  exchange: string,
  routingKey: string,
  content: Buffer,
  options?: amqplib.Options.Publish,
): boolean => channel.publish(exchange, routingKey, content, options);
