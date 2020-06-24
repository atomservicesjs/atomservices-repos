import { Collection } from "mongodb";

export const createEventsIndex = async (collection: Collection) => Promise.all([
  collection.createIndex({
    aggregateID: 1,
    _version: 1,
  }, {
    name: "_event_version",
  }),

  collection.createIndex({
    aggregateID: 1,
    _version: 1,
  }, {
    name: "_event_name",
  }),

  collection.createIndex({
    aggregateID: 1,
  }, {
    name: "_event_aggregateID",
  }),

  collection.createIndex({
    _createdAt: 1,
  }, {
    name: "_created_at",
  }),

  collection.createIndex({
    _createdBy: 1,
  }, {
    name: "_created_by",
  }),
]);
