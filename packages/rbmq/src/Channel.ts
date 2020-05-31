import * as amqplib from "amqplib/callback_api";
import { ChannelUtil } from "./channel.util";
import { IMQChannel } from "./IMQChannel";

export const Channel = async (channel: amqplib.Channel): Promise<IMQChannel> => ({
  ack: (message, allUpTo) =>
    ChannelUtil.ack(channel, message, allUpTo),
  assertExchange: (exchange, type, options) =>
    ChannelUtil.assertExchange(channel, exchange, type, options),
  assertQueue: (queue, options) =>
    ChannelUtil.assertQueue(channel, queue, options),
  bindExchange: (destination, source, pattern, args) =>
    ChannelUtil.bindExchange(channel, destination, source, pattern, args),
  bindQueue: (queue, source, pattern, args) =>
    ChannelUtil.bindQueue(channel, queue, source, pattern, args),
  checkExchange: (exchange) =>
    ChannelUtil.checkExchange(channel, exchange),
  checkQueue: (queue) =>
    ChannelUtil.checkQueue(channel, queue),
  close: () =>
    ChannelUtil.close(channel),
  consume: (queue, onMessage, options) =>
    ChannelUtil.consume(channel, queue, onMessage, options),
  createAck: (message, allUpTo) =>
    ChannelUtil.createAck(channel, message, allUpTo),
  deleteExchange: (exchange, options) =>
    ChannelUtil.deleteExchange(channel, exchange, options),
  deleteQueue: (queue, options) =>
    ChannelUtil.deleteQueue(channel, queue, options),
  publish: (exchange, routingKey, content, options?) =>
    ChannelUtil.publish(channel, exchange, routingKey, content, options),
  sendToQueue: (queue, content, options) =>
    ChannelUtil.sendToQueue(channel, queue, content, options),
  toOnMessage: (process) =>
    ChannelUtil.toOnMessage(process),
  toOnMessageWithAck: (process) =>
    ChannelUtil.toOnMessageWithAck(channel, process),
});
