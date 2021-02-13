import { ICommand } from "../ICommand";
import { IDispatchMeta } from "./IDispatchMeta";
import { IDispatchResult } from "./DispatchResult";

export type IDispatchFunc = (command: ICommand, meta?: IDispatchMeta, listening?: (data: any) => void) => Promise<IDispatchResult>;

export const initiate = (): IDispatchFunc => async () => ({
  accept: false,
  status: "error",
  error: "NotImplementedDispatchFunction",
});
