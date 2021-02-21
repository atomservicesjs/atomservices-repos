import { Files } from "./structure";

export const service = (configs: {
  basepath: string;
  ext: "js" | "ts";
  type: string;
  containized?: string;
}) => {
  const {
    basepath,
    ext,
    type,
    containized = "Services"
  } = configs;

  const props = {
    basepath,
    containized,
    ext,
  };

  Files.Type(props).create({ type });
  Files.Commands(props).create({ type });

  Files.ContainerInitializer(props).addService({ type });
  Files.ServicesContainer(props).addService({ type });
};
