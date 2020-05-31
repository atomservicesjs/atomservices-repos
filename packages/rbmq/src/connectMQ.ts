import { Channel } from "./Channel";
import { ConnectionUtil } from "./connection.util";
import { IMQConnection } from "./IMQConnection";

export const connectMQ = async (url: string = "amqp://localhost", connectOptions?: any): Promise<IMQConnection> => {
  const connection = await ConnectionUtil.connect(url, connectOptions);

  return {
    Channel: () => ConnectionUtil.createChannel(connection),
    Connection: async () => connection,
    createChannel: async () => {
      const channel = await ConnectionUtil.createChannel(connection);

      return Channel(channel);
    },
    disconnect: () => ConnectionUtil.disconnect(connection),
  };
};
