import { DispatchResult, ICommand, IDispatchMeta } from "atomservicescore";

export interface ICommandDispatcher {
  scope: () => string;
  type: () => string;
  dispatch: (command: ICommand, meta?: IDispatchMeta, listening?: (data: any) => void) => Promise<DispatchResult.IDispatchResult>;
}
