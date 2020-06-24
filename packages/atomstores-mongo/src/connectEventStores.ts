import { Db, Collection } from "mongodb";
import { IEventStores } from "atomservicescore";
import { createEventsIndex } from "./core/createEventsIndex";
import { createEventStores } from "./createEventStores";
import { IEventStoresConnect } from "./IEventStoresConnect";

export const connectEventStores = (connectDB: () => Promise<Db>): IEventStores => (() => {
  const MAP: { [collection: string]: Collection; } = {};

  const EventStoresConnect: IEventStoresConnect = {
    connect: async (scope, type) => {
      if (!MAP[type]) {
        const DB = await connectDB();
        const collection = DB.collection(type);
        await createEventsIndex(collection);
        MAP[type] = collection;
      }

      return MAP[type];
    },
  };

  return createEventStores(EventStoresConnect);
})();
