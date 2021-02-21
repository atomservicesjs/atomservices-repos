import * as FS from "fs";
import * as Path from "path";
import * as Write from "write";
import { IProps } from "./IProps";

const templateCreate = () => `import { Containers } from "atomservices";
import ServicesContainer from "./ServicesContainer";

// ## Import Dispatchable Services ##

const ContainerInitializer = Containers.composeContainerInitializer(ServicesContainer, {
  // ## Dispatchable Services ##
});

export default ContainerInitializer;
`;

const templateImport = (type: string) => `import ${type} from "./${type}";\n`;
const templateService = (type: string) => `  ${type},\n`;

export const ContainerInitializer = ({ basepath, containized, ext }: IProps) => {
  const file = Path.resolve(basepath, `./${containized}/ContainerInitializer.${ext}`);

  return {
    // CONTAINER
    create: () => {
      Write.sync(file, templateCreate());
    },
    // SERVICE
    addService: ({ type }: { type: string; }) => {
      const isExist = FS.existsSync(file);

      if (!isExist) {
        Write.sync(file, templateCreate());
      }

      const data = FS.readFileSync(file, "utf8");
      const importText = "// ## Import Dispatchable Services ##\n";
      const importIndex = data.indexOf(importText) + importText.length;

      const servicesText = "// ## Dispatchable Services ##\n";
      const servicesIndex = data.indexOf(servicesText) + servicesText.length;

      const content = data.slice(0, importIndex) +
        templateImport(type) +
        data.slice(importIndex, servicesIndex) +
        templateService(type) +
        data.slice(servicesIndex);

      Write.sync(file, content);
    },
  };
};
