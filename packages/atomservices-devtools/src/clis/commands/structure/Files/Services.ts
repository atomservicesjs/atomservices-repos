import * as Path from "path";
import * as Write from "write";
import { IProps } from "./IProps";

export const Services = ({ basepath, containized, ext }: IProps) => {
  const file = Path.resolve(basepath, `./${containized}/index.${ext}`);

  return {
    create: () => {
      Write.sync(file, "");
    },
  }
};
