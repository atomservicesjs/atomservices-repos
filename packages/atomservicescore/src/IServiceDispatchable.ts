import { IDispatchFunc } from "./common/DispatchFunc"

export interface IServiceDispatchable {
  dispatch: IDispatchFunc;
  [key: string]: any;
}
