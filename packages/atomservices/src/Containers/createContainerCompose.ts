import { IServicesContainer } from "atomservicescore";
import { createContainer } from "./createContainer";
import { Enhancement } from "./Enhancement";
import { IManagedServiceContainerResult } from "./IManagedServiceContainerResult";

export type ComposeServiceContainer = (container: IServicesContainer) => Promise<IServicesContainer>;

export const createContainerCompose = (container: IServicesContainer, enhancement?: Enhancement) => {
  return async (compose: ComposeServiceContainer): Promise<IManagedServiceContainerResult | ReturnType<Enhancement>> => {
    const composed = await compose(container);

    return createContainer(composed, enhancement);
  }
};
