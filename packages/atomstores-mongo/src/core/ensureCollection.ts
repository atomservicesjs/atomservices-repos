import { Db } from "mongodb";

export const ensureCollection = async (db: Db, collection: string) => {
  await db.collection(collection);
};
