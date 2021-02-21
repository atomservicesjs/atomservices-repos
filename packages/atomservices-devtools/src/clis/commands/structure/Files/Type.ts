import * as Path from "path";
import * as Write from "write";
import { IProps } from "./IProps";

const templateService = (type: string) => `import { DispatchFunc } from "atomservices";
import * as Commands from "./Commands";
import * as Queries from "./Queries";
import Type from "./Type";

export const ${type} = {
  Commands,
  Queries,
  Type,
  dispatch: DispatchFunc.initiate(),
};
`;

const templateContainizedService = () => `import { IService } from "atomservices";
import Scope from "../Scope";
import Type from "./Type";
import * as SFC from "./SFC";

const ContainizedService: IService = {
  scope: Scope,
  type: Type,
  SFC,
};

export default ContainizedService;
`;

export const Type = ({ basepath, containized, ext }: IProps) => ({
  create: ({ type }: { type: string; }) => {
    const based = Path.resolve(basepath, `./${containized}/${type}`);

    const QueriesFile = Path.resolve(based, `./Queries/index.${ext}`);
    const SFCFile = Path.resolve(based, `./SFC/index.${ext}`);
    const StatesFile = Path.resolve(based, `./States/index.${ext}`);
    const TypeFile = Path.resolve(based, `./Type.${ext}`);
    const ContainizedServiceFile = Path.resolve(based, `./ContainizedService.${ext}`);
    const ServiceFile = Path.resolve(based, `./index.${ext}`);

    Write.sync(QueriesFile, "");
    Write.sync(SFCFile, "");
    Write.sync(StatesFile, "");
    Write.sync(TypeFile, `export default "${type}";\n`);
    Write.sync(ContainizedServiceFile, templateContainizedService());
    Write.sync(ServiceFile, templateService(type));
  },
});
