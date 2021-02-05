import { IManagedServicesContainer } from "../IManagedServicesContainer";

type EnhanceManagedServicesContainerResult = {
  Container: IManagedServicesContainer;
};

export type EnhanceManagedServicesContainer<Result extends EnhanceManagedServicesContainerResult = EnhanceManagedServicesContainerResult> =
  (container: IManagedServicesContainer) => Result;
