import { ICommand, IManagedService, IManagedServiceContainer, IServiceContainer } from "atomservicescore";
import { composeNotifiers, ContainersNotifyData } from "../Notifiers";
import { createService } from "../Services/createService";
import { Enhancement } from "./Enhancement";
import { IManagedServiceContainerResult } from "./IManagedServiceContainerResult";

export const createContainer = (container: IServiceContainer, enhancement?: Enhancement): IManagedServiceContainerResult =>
  ((CONTAINER, ENHANCEMENT): IManagedServiceContainerResult | ReturnType<Enhancement> => {
    const ContainerNotifiers = CONTAINER.Notifiers || [];
    const NOTIFIERS = composeNotifiers(...ContainerNotifiers);

    const Services = Object.keys(CONTAINER.Services).reduce((result, key) => {
      const service = createService(CONTAINER.Services[key], CONTAINER);
      const type = service.type();
      result[type] = service;

      return result;
    }, {} as { [key: string]: IManagedService; });

    const ResolveService = (type: string) => Services[type];

    const Container: IManagedServiceContainer = {
      assignDispatch: (service: string | { Type: string; }, options: { isAutoConnect?: boolean; }) => {
        const { isAutoConnect = false } = options;
        const target = typeof service === "string" ? { Type: service } : service;

        const dispatch = async (command: ICommand, listening?: (data: any) => void) => {
          if (isAutoConnect) {
            await Container.connect();
          }

          const Service = ResolveService(target.Type);

          return Service.dispatch(command, listening);
        };

        return Object.assign(target, { dispatch });
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

          const service = ResolveService(type);

          return service.dispatch(command, listening);
        };
      },
      dispatch: async (type, command, listening) => {
        const service = ResolveService(type);

        return service.dispatch(command, listening);
      },
      service: (type) =>
        ResolveService(type),
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
      return ENHANCEMENT(Container);
    } else {
      return {
        Container,
      };
    }
  })(container, enhancement);
