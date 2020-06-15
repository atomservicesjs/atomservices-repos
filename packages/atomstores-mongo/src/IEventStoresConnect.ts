import { Collection } from "mongodb";

export interface IEventStoresConnect {
  connect: (scope: string, type: string) => Promise<Collection>;
}
