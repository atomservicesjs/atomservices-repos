import { IDispatchFunc } from "./common/DispatchFunc"

export interface IServiceDispatchable {
  Type: string;
  dispatch: IDispatchFunc;
  [key: string]: any;
}
