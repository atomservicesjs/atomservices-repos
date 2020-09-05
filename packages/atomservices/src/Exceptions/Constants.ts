/* [123456]
 * [12] - 00: This Library Scoped
 * [34] - 00: Components
 *        01: Process
 * [56] - Running Exceptions
 */

export const ComposeDuplicatedCommandHandlers = "ComposeDuplicatedCommandHandlers";
export const ComposeDuplicatedEventHandlers = "ComposeDuplicatedEventHandlers";
export const ComposeDuplicatedStateHandlers = "ComposeDuplicatedStateHandlers";
export const CombineDuplicatedCommandDispatchers = "CombineDuplicatedCommandDispatchers";
export const CombineInvalidScopeCommandDispatchers = "CombineInvalidScopeCommandDispatchers";


export const EventVersionConflictedConcurrent = "EventVersionConflictedConcurrent";
export const CurrentVersionQueryingError = "CurrentVersionQueryingError";
export const EventStoringError = "EventStoringError";
export const EventPublishingError = "EventPublishingError";
export const NotAllowedVersionEventError = "NotAllowedVersionEventError";
export const NotAllowedDynamicVersionEventError = "NotAllowedDynamicVersionEventError";
export const NoEventStoresProvided = "NoEventStoresProvided";
export const InvalidVersioningValue = "InvalidVersioningValue";

export default {
  // General
  "000001_ComposeDuplicatedCommandHandlers": { code: "000001", name: ComposeDuplicatedCommandHandlers },
  "000002_ComposeDuplicatedEventHandlers": { code: "000002", name: ComposeDuplicatedEventHandlers },
  "000003_ComposeDuplicatedStateHandlers": { code: "000003", name: ComposeDuplicatedStateHandlers },
  "000004_CombineDuplicatedCommandDispatchers": { code: "000004", name: CombineDuplicatedCommandDispatchers },
  "000005_CombineInvalidScopeCommandDispatchers": { code: "000005", name: CombineInvalidScopeCommandDispatchers },


  // Event Processing
  "000100_EventVersionConflictedConcurrent": { code: "000100", name: EventVersionConflictedConcurrent },
  "000101_CurrentVersionQueryingError": { code: "000101", name: CurrentVersionQueryingError },
  "000102_EventStoringError": { code: "000102", name: EventStoringError },
  "000103_EventPublishingError": { code: "000103", name: EventPublishingError },
  "000107_NotAllowedVersionEventError": { code: "000107", name: NotAllowedVersionEventError },
  "000108_NotAllowedDynamicVersionEventError": { code: "000108", name: NotAllowedDynamicVersionEventError },
  "000110_NoEventStoresProvided": { code: "000110", name: NoEventStoresProvided },
  "000120_InvalidVersioningValue": { code: "000120", name: InvalidVersioningValue },
};
