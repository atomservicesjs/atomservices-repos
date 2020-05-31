import * as amqplib from "amqplib/callback_api";
import { IMQChannel } from "./IMQChannel";

export interface IMQConnection {
  Channel: () => Promise<amqplib.Channel>;
  Connection: () => Promise<amqplib.Connection>;
  createChannel: () => Promise<IMQChannel>;
  disconnect: () => Promise<void>;
}
