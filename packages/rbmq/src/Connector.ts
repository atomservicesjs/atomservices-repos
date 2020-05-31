import { connectMQ } from "./connectMQ";
import { IConnector } from "./IConnector";
import { IConnectorConfigs } from "./IConnectorConfigs";

export const Connector = (configs?: IConnectorConfigs): IConnector => ({
  connect: async () => {
    const { url, options } = configs !== undefined ? configs : { url: undefined, options: undefined };

    return connectMQ(url, options);
  },
});
