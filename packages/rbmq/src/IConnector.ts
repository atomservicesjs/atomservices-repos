import { IMQConnection } from "./IMQConnection";

export interface IConnector {
  connect: () => Promise<IMQConnection>;
}
