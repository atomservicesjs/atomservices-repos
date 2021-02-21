import * as Path from "path";
import * as Write from "write";
import { IProps } from "./IProps";

export const Scope = ({ basepath, containized, ext }: IProps) => {
  const file = Path.resolve(basepath, `./${containized}/Scope.${ext}`);

  return {
    create: ({ scope }: { scope: string; }) => {
      Write.sync(file, `export default "${scope}";\n`);
    },
  };
};
