import { ICommand } from "./ICommand";
import { IDispatchResult } from "./common/DispatchResult";

export type DispatchFunc = (command: ICommand, listening?: (data: any) => void) => Promise<IDispatchResult>;
