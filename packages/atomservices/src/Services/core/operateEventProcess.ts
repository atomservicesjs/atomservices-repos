import { EventStream, IEvent, IEventHandler, INotifiers, IServiceContext, IStateApplier } from "atomservicescore";
import { ServicesNotifyData } from "../../Notifiers";
import { MetadataRefiner } from "./MetadataRefiner";

export const operateEventProcess = (
  EventHandler: IEventHandler,
  StateApplier: IStateApplier,
  ServiceContext: IServiceContext,
  resulting: (result: any) => Promise<void>,
  Notifiers: INotifiers,
) =>
  async (service: { scope: string; type: string; }, event: IEvent, metadata: EventStream.IStreamMetadata) => {
    const meta = MetadataRefiner.consume(metadata);
    let hasError = false;
    let result;

    try {
      result = await EventHandler.process(event, meta, StateApplier);
    } catch (error) {
      Notifiers.error(ServicesNotifyData.SERVICE_EVENT_PROCESS_ERROR(event.name, {
        eventID: event._id,
        scope: service.scope,
        type: service.type,
        // tslint:disable-next-line: object-literal-sort-keys
        name: event.name,
        aggregateID: event.aggregateID,
        _createdAt: event._createdAt,
        _createdBy: event._createdBy,
        ...(event._version ? { _version: event._version } : {}),
      }, {
        event,
      },
        meta), error);

      result = error;
      hasError = true;
    }

    if (!hasError && EventHandler.processEffect) {
      try {
        await EventHandler.processEffect({ event, metadata: meta, result }, resulting, ServiceContext);
      } catch (error) {
        Notifiers.error(ServicesNotifyData.SERVICE_EVENT_PROCESS_EFFECT_ERROR(event.name, {
          eventID: event._id,
          scope: service.scope,
          type: service.type,
          // tslint:disable-next-line: object-literal-sort-keys
          name: event.name,
          aggregateID: event.aggregateID,
          _createdAt: event._createdAt,
          _createdBy: event._createdBy,
          ...(event._version ? { _version: event._version } : {}),
        }, {
          event,
        },
          meta), error);
        hasError = true;
      }
    } else {
      if (result) {
        await resulting(result);
      }

      if (!hasError) {
        Notifiers.emit(ServicesNotifyData.SERVICE_EVENT_HANDLED(event.type, {
          eventID: event._id,
          scope: service.scope,
          type: service.type,
          // tslint:disable-next-line: object-literal-sort-keys
          name: event.name,
          aggregateID: event.aggregateID,
          _createdAt: event._createdAt,
          _createdBy: event._createdBy,
          ...(event._version ? { _version: event._version } : {}),
        }, {
          event,
          result,
        },
          meta));
      }
    }
  };
