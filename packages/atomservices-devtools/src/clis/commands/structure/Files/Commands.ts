import * as Path from "path";
import * as Write from "write";
import { IProps } from "./IProps";

export const Commands = ({ basepath, containized, ext }: IProps) => ({
  // SERVICE
  create: ({ type }: { type: string; }) => {
    const based = Path.resolve(basepath, `./${containized}/${type}`);
    const file = Path.resolve(based, `./Commands.${ext}`);

    Write.sync(file, "");
  },
});
