import { Files } from "./structure";

export const sfc = (configs: {
  basepath: string;
  ext: "js" | "ts";
  type: string;
  event: string;
  command?: string;
  containized?: string;
}) => {
  const {
    basepath,
    ext,
    type,
    event,
    command,
    containized = "Services"
  } = configs;

  const props = {
    basepath,
    containized,
    ext,
  };

  Files.SFC(props).create({ type, event, command });
};
