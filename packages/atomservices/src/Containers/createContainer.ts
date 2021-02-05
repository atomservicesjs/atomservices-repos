import {
  EnhanceManagedServicesContainer,
  ICommand,
  IManagedService,
  IManagedServicesContainer,
  IServicesContainer,
} from "atomservicescore";
import { composeNotifiers, ContainersNotifyData } from "../Notifiers";
import { createService } from "../Services/createService";

export const createContainer = (container: IServicesContainer, enhancement?: EnhanceManagedServicesContainer) =>
  ((CONTAINER, ENHANCEMENT) => {
    const ContainerNotifiers = CONTAINER.Notifiers || [];
    const NOTIFIERS = composeNotifiers(...ContainerNotifiers);

    const Services = Object.keys(CONTAINER.Services).reduce((result, key) => {
      const service = createService(CONTAINER.Services[key], CONTAINER);
      const type = service.type();

      result[type] = service;

      return result;
    }, {} as { [key: string]: IManagedService; });

    const Container: IManagedServicesContainer = {
      assignDispatch: (service, options: { isAutoConnect?: boolean; } = {}) => {
        const { isAutoConnect = false } = options;

        const dispatch = async (command: ICommand, listening?: (data: any) => void) => {
          if (isAutoConnect) {
            await Container.connect();
          }

          const Service = Container.service(service.Type);

          return Service.dispatch(command, listening);
        };

        return Object.assign(service, { dispatch });
      },
      connect: (() => {
        let IsConnected = false;

        return async () => {
          if (!IsConnected) {
            await Promise.all(Object.keys(Services).map((type) => Services[type].connect()));
            IsConnected = true;

            NOTIFIERS.emit(ContainersNotifyData.CONTAINER_CONNECTED(CONTAINER.scope));
          }
        };
      })(),
      composeDispatch: (type, options = {}) => {
        const { isAutoConnect = false } = options;

        return async (command, listening) => {
          if (isAutoConnect) {
            await Container.connect();
          }

          const service = Container.service(type);

          return service.dispatch(command, listening);
        };
      },
      dispatch: async (type, command, listening) => {
        const service = Container.service(type);

        return service.dispatch(command, listening);
      },
      service: (type) => {
        return Services[type];
      },
      scope: () =>
        CONTAINER.scope,
    };

    Object.freeze(Container);

    NOTIFIERS.emit(ContainersNotifyData.CONTAINER_CREATED(CONTAINER.scope, {
      scope: CONTAINER.scope,
      // tslint:disable-next-line: object-literal-sort-keys
      defined: {
        EventStores: (CONTAINER.EventStores && true) || false,
        EventStream: (CONTAINER.EventStream && true) || false,
        Identifier: (CONTAINER.Identifier && true) || false,
      },
    }));

    if (ENHANCEMENT) {
      const result = ENHANCEMENT(Container);

      return result;
    } else {
      return { Container };
    }
  })(container, enhancement);
