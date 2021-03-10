import { IService } from "atomservices";
import Scope from "../Scope";
import Type from "./Type";
import * as SFC from "./SFC";

const ContainizedService: IService = {
  scope: Scope,
  type: Type,
  SFC,
};

export default ContainizedService;
