import { IDispatchResult } from "./common/DispatchResult";
import { IDispatchMeta } from "./common/IDispatchMeta";
import { ICommand } from "./ICommand";
import { IServiceContext } from "./Service/IServiceContext";

export interface IManagedService {
  scope: () => string;
  type: () => string;
  dispatch: (command: ICommand, meta?: IDispatchMeta, listening?: (data: any) => void) => Promise<IDispatchResult>;
  connect: () => Promise<void>;
  context: (props: {
    isReplay: boolean;
  }) => IServiceContext;
}
