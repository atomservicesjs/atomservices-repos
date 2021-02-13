import { DispatchResult, ICommand, IDispatchMeta } from "atomservicescore";

export interface ICommandDispatchers {
  dispatch: (type: string, command: ICommand, meta?: IDispatchMeta, listening?: (data: any) => void) => Promise<DispatchResult.IDispatchResult>;
}
