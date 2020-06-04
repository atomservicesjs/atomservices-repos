import { IManagedServiceContainer } from "atomservicescore";
import { IManagedServiceContainerResult } from "./IManagedServiceContainerResult";

export type Enhancement<T extends IManagedServiceContainerResult = IManagedServiceContainerResult> = (container: IManagedServiceContainer) => T;
