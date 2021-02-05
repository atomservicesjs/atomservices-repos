import { ComposeServicesContainer, EnhanceManagedServicesContainer } from "./Containers";

export interface IServicesContainerInitializer {
  compose: (composer: ComposeServicesContainer) => IServicesContainerInitializer;
  initialize: (enhancement?: EnhanceManagedServicesContainer) => ReturnType<EnhanceManagedServicesContainer>;
}
