import { IDispatchMeta } from "./common/IDispatchMeta";
import { IDispatchResult } from "./common/DispatchResult";
import { ICommand } from "./ICommand";
import { IManagedService } from "./IManagedService";

export interface IManagedServicesContainer {
  connect: () =>
    Promise<void>;
  composeDispatch: (type: string, options?: { isAutoConnect?: boolean; }) =>
    (command: ICommand, meta?: IDispatchMeta, listening?: (data: any) => void) => Promise<IDispatchResult>;
  dispatch: (type: string, command: ICommand, meta?: IDispatchMeta, listening?: (data: any) => void) =>
    Promise<IDispatchResult>;
  service: (type: string) =>
    IManagedService;
  scope: () =>
    string;
  assignDispatch<T extends { Type: string; }>(service: T, options?: { isAutoConnect?: boolean; }): T & {
    Type: string;
    dispatch: (command: ICommand, meta?: IDispatchMeta, listening?: (data: any) => void) => Promise<IDispatchResult>;
  };
}
