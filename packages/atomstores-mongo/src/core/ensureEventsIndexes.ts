import { Collection } from "mongodb";

export const ensureEventsIndexes = (collection: Collection) =>
  Promise.all([
    collection.createIndex({
      aggregateID: 1,
      _version: 1,
    }, {
      name: "__event_version_",
    }),

    collection.createIndex({
      aggregateID: 1,
    }, {
      name: "__event_aggregateID_",
    }),

    collection.createIndex({
      name: 1,
    }, {
      name: "__event_name_",
    }),

    collection.createIndex({
      _createdAt: 1,
    }, {
      name: "__created_at_",
    }),

    collection.createIndex({
      _createdBy: 1,
    }, {
      name: "__created_by_",
    }),
  ]);
