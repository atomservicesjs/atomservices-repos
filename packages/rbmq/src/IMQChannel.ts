import * as amqplib from "amqplib/callback_api";
import { ExchangeTypes } from "./ExchangeTypes";

export interface IMQChannel {
  ack: (
    message: amqplib.Message,
    allUpTo?: boolean,
  ) => void;
  assertExchange: (
    exchange: string,
    type: ExchangeTypes,
    options?: amqplib.Options.AssertExchange,
  ) => Promise<amqplib.Replies.AssertExchange>;
  assertQueue: (
    queue?: string,
    options?: amqplib.Options.AssertQueue,
  ) => Promise<amqplib.Replies.AssertQueue>;
  bindExchange: (
    destination: string,
    source: string,
    pattern: string,
    args?: any,
  ) => Promise<amqplib.Replies.Empty>;
  bindQueue: (
    queue: string,
    source: string,
    pattern: string,
    args?: any,
  ) => Promise<amqplib.Replies.Empty>;
  checkExchange: (
    exchange: string,
  ) => Promise<amqplib.Replies.Empty>;
  checkQueue: (
    queue: string,
  ) => Promise<amqplib.Replies.AssertQueue>;
  close: () => Promise<void>;
  consume: (
    queue: string,
    onMessage: (msg: amqplib.Message | null) => any,
    options?: amqplib.Options.Consume,
  ) => Promise<amqplib.Replies.Consume>;
  createAck: (
    message: amqplib.Message,
    allUpTo?: boolean,
  ) => () => void;
  deleteExchange: (
    exchange: string,
    options?: amqplib.Options.DeleteExchange,
  ) => Promise<amqplib.Replies.Empty>;
  deleteQueue: (
    queue: string,
    options?: amqplib.Options.DeleteExchange,
  ) => Promise<amqplib.Replies.Empty>;
  publish: (
    exchange: string,
    routingKey: string,
    content: Buffer,
    options?: amqplib.Options.Publish,
  ) => boolean;
  sendToQueue: (
    queue: string,
    content: Buffer,
    options?: amqplib.Options.Publish,
  ) => boolean;
  toOnMessage: (process: (data: any) => void) =>
    (msg: amqplib.Message | null) => any;
  toOnMessageWithAck: (process: (data: any, ack: () => void) => void) =>
    (msg: amqplib.Message | null) => any;
}
