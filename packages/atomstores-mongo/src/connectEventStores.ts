import { Db, Collection } from "mongodb";
import { IEventStores } from "atomservicescore";
import { createEventStores } from "./createEventStores";
import { IEventStoresConnect } from "./IEventStoresConnect";

export const connectEventStores = (connectDB: () => Promise<Db>): IEventStores => (() => {
  const MAP: { [collection: string]: Collection; } = {};

  const EventStoresConnect: IEventStoresConnect = {
    connect: async (scope, type) => {
      if (!MAP[type]) {
        const DB = await connectDB();
        MAP[type] = DB.collection(type);
      }

      return MAP[type];
    },
  };

  return createEventStores(EventStoresConnect);
})();
