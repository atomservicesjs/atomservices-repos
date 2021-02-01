import { ICommand } from "../ICommand";
import { IDispatchResult } from "./DispatchResult";

export type IDispatchFunc = (command: ICommand, listening?: (data: any) => void) => Promise<IDispatchResult>;

export const initiate = (): IDispatchFunc => async () => ({
  accept: false,
  status: "error",
  error: "NotImplementedDispatchFunction",
});
