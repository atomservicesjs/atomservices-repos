import { Files } from "./structure";

export const init = (configs: {
  basepath: string;
  ext: "js" | "ts";
  scope: string;
  containized?: string;
}) => {
  const {
    basepath,
    ext,
    scope,
    containized = "Services"
  } = configs;

  const props = {
    basepath,
    containized,
    ext,
  };

  Files.ContainerInitializer(props).create();
  Files.Scope(props).create({ scope });
  Files.ServicesContainer(props).create();
  Files.Services(props).create();
};
