import { DispatchFunc } from "atomservices";
import * as Commands from "./Commands";
import * as Queries from "./Queries";
import Type from "./Type";

export const UserAuths = {
  Commands,
  Queries,
  Type,
  dispatch: DispatchFunc.initiate(),
};
