import { Collection } from "mongodb";

export interface IEventStoresConnector {
  connect: (scope: string, type: string) => Promise<Collection>;
}
