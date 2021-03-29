import { IEvent, IServiceContext, IServiceDefinition } from "atomservicescore";
import { composeEventHandlers } from "../../Events/composeEventHandlers";
import { composeStateApplier } from "../../States/composeStateApplier";
import { composeStateHandlers } from "../../States/composeStateHandlers";

import { ServicesNotifyData } from "../../Notifiers";
import { LocalDirectStream } from "../../Streams/LocalDirectStream";
import { MetadataRefiner } from "./MetadataRefiner";

import {
  CurrentVersionQueryingErrorException,
  EventPublishingErrorException,
  EventStoringErrorException,
  EventVersionConflictedConcurrentException,
  NoEventStoresProvidedException,
  NotAllowedVersioningEventErrorException,
  NotAllowedDynamicVersionEventErrorException,
} from "../../Exceptions/Core";

import { operateEventProcess } from "./operateEventProcess";

export const isEventVersionDefined = (event: IEvent) => (event._version && event._version > 0);

export const composeServiceContext = (definition: IServiceDefinition) => ((Definition) => {
  const {
    EventStores,
    EventStream,
    Notifiers,
    ServiceConfigurate,
    ServiceIdentifier,
    scope,
    type,
  } = Definition;

  const EventHandlers = composeEventHandlers(...definition.EventHandlers)(type);
  const StateHandlers = composeStateHandlers(...definition.StateHandlers)(type);
  const StateApplier = composeStateApplier({ StateHandlers });

  return (metadata: {
    isReplay: boolean;
    [key: string]: any;
  }): IServiceContext => {
    const ServiceContext: IServiceContext = {
      AggregateID: () =>
        ServiceIdentifier.AggregateID(),
      EventID: () =>
        ServiceIdentifier.EventID(),
      directTo: (ref, data) =>
        EventStream.directTo(ref, data),
      dispatch: async (event) => {
        const versioning = ServiceConfigurate.versioning(event.name);
        let eventVersion: number | undefined = event._version;

        // STORE EVENT
        if (EventStores && !metadata.isReplay) {
          if (versioning === "none") {
            // NON-VERSIONING
            if (event._version === undefined || event._version === null) {
              await EventStores.storeEvent(scope, event);
            } else {
              throw NotAllowedVersioningEventErrorException(event, scope);
            }
          } else {
            // VERSIONING
            let version: number;

            try {
              version = (await EventStores.queryCurrentVersion(scope, type, event.aggregateID)).version;
            } catch (error) {
              throw CurrentVersionQueryingErrorException(error, event.aggregateID, type, scope);
            }

            const currentVersion = version;

            if (!isEventVersionDefined(event)) {
              if (versioning === "dynamic") {
                eventVersion = currentVersion + 1;
                event._version = eventVersion;
              } else {
                throw NotAllowedDynamicVersionEventErrorException(event, scope);
              }
            }

            if (currentVersion + 1 === eventVersion) {
              try {
                await EventStores.storeEvent(scope, event);
              } catch (error) {
                throw EventStoringErrorException(error, event, scope);
              }
            } else {
              throw EventVersionConflictedConcurrentException(event, currentVersion, scope);
            }
          }
        } else {
          if (!isEventVersionDefined(event)) {
            if (versioning === "static") {
              throw NotAllowedDynamicVersionEventErrorException(event, scope);
            } else if (versioning === "dynamic") {
              eventVersion = -1;
              event._version = eventVersion;
            }
          }
        }

        // PREPARE
        const meta = MetadataRefiner.dispatch(metadata);
        const processType = ServiceConfigurate.processType(event.name);

        // SYNC PROCESS
        if (processType === "synchronous") {
          const EventHandler = EventHandlers.resolve(event);

          if (EventHandler) {
            const resulting = (data: any) => LocalDirectStream.directTo(event._id, data);
            await operateEventProcess(EventHandler, StateApplier, ServiceContext, resulting, Notifiers)(Definition, event, meta);
          }
        }

        // PUBLISH EVENT
        try {
          const on = { level: ServiceConfigurate.level(event.name), scope };

          await EventStream.publish({ event, metadata: meta, on });

          Notifiers.emit(ServicesNotifyData.SERVICE_EVENT_DISPATCHED(type, {
            eventID: event._id,
            scope,
            type,
            // tslint:disable-next-line: object-literal-sort-keys
            name: event.name,
            aggregateID: event.aggregateID,
            _createdAt: event._createdAt,
            _createdBy: event._createdBy,
            ...(isEventVersionDefined(event) ? { _version: event._version } : {}),
          }, {
            event,
          },
            meta));
        } catch (error) {
          throw EventPublishingErrorException(error, event, scope);
        }
      },
      listenTo: async (ref, listener) =>
        EventStream.listenTo(ref, listener),
      notify: (data) =>
        Notifiers.emit({
          action: data.action,
          component: {
            name: definition.type,
            type: "Service",
          },
          fields: data.fields,
          level: data.level,
          message: data.message,
          obj: data.obj,
          meta: data.meta,
        }),
      queryCurrentVersion: (aggregateID) => {
        if (EventStores) {
          return EventStores.queryCurrentVersion(scope, type, aggregateID);
        } else {
          throw NoEventStoresProvidedException();
        }
      },
      scope: () =>
        scope,
      type: () =>
        type,
    };

    return ServiceContext;
  };
})(definition);
