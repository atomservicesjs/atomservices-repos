import { IManagedServiceContainer } from "atomservicescore";

export interface IManagedServiceContainerResult {
  Container: IManagedServiceContainer;
  [key: string]: any;
};
