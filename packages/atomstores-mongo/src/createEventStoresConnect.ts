import { Db, MongoClient, MongoClientOptions } from "mongodb";
import { IEventStoresConnect } from "./IEventStoresConnect";

interface IEventStoresConnectConfigs {
  url?: string;
  dbName: string;
  options?: any;
  convert?: (values: { scope: string; type: string; }) => { collection: string; };
}

const DEFINED = {
  convert: (values: { scope: string; type: string; }) => ({ collection: values.type }),
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as MongoClientOptions,
  url: "mongodb://localhost:27017",
};

export const createEventStoresConnect = (configs: IEventStoresConnectConfigs = { dbName: "EventStores" }): IEventStoresConnect => ((Configs): IEventStoresConnect => {
  const {
    dbName,
    url = DEFINED.url,
    convert = DEFINED.convert,
  } = Configs;

  const options = Object.assign({}, DEFINED.options, Configs.options || {});

  const Client = new MongoClient(url, options);
  let DBInstance: Db;

  return {
    connect: async (scope, type) => {
      const { collection } = convert({ scope, type });

      if (DBInstance) {
        await Client.connect();
        DBInstance = Client.db(dbName);
      }

      return DBInstance.collection(collection);
    },
  };
})(configs);
