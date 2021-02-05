import {
  ComposeServicesContainer,
  IServiceDispatchable,
  IServicesContainer,
  IServicesContainerInitializer,
} from "atomservicescore";
import { createContainer } from "./createContainer";

export const composeContainerInitializer = (container: IServicesContainer, dispatchableServices: {
  [service: string]: IServiceDispatchable;
}): IServicesContainerInitializer => ((Container): IServicesContainerInitializer => {
  const ComposersSet = new Set<ComposeServicesContainer>();

  const Initializer: IServicesContainerInitializer = {
    compose: (composer) => {
      ComposersSet.add(composer);

      return Initializer;
    },
    initialize: (enhancement) => {
      const composed = [...ComposersSet].reduce((result, compose) => compose(result), Container);

      return createContainer(composed, (managedContainer) => {
        Object.keys(dispatchableServices).forEach((key) => {
          const service = dispatchableServices[key];

          managedContainer.assignDispatch(service, { isAutoConnect: true });
        });

        if (enhancement) {
          return enhancement(managedContainer);
        } else {
          return { Container: managedContainer };
        }
      });
    },
  };

  return Initializer;
})(container);
