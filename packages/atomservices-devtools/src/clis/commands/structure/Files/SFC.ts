import * as FS from "fs";
import * as Path from "path";
import * as Write from "write";
import { IProps } from "./IProps";

const templateCreate = (event: string, command?: string) => `import { ${command ? "ICommand, " : ""}IEvent, SFComponents } from "atomservices";
${command ? `
interface I${command}CommandPayloads {
}

interface I${command}Command extends ICommand<I${command}CommandPayloads> {
}
` : ""}
interface I${event}EventPayloads {
}

interface I${event}Event extends IEvent<I${event}EventPayloads> {
}

export const { Configs, Commander, CommandHandler, EventHandler, StateHandler } =
  SFComponents.createSFComponents<I${event}Event${command ? `, I${command}Command` : ""}>({
    configs: {
    },${command ? `
    command: {
      name: "${command}",
    },` : ""}
    event: {
      name: "${event}",
    },
    state: {
      apply: async (event) => {
      },
    },
  });
`;

const templateIndex = (event: string) => `export * as ${event} from "./${event}";\n`;
const templateCommands = (event: string, command?: string) => `export { Commander as ${command || event} } from "./SFC/${event}";\n`;

export const SFC = ({ basepath, containized, ext }: IProps) => {
  return {
    // EVENT
    create: ({ type, event, command }: { type: string; event: string; command?: string; }) => {
      const based = Path.resolve(basepath, `./${containized}/${type}`);
      const index = Path.resolve(based, `./SFC/index.${ext}`);
      const sfc = Path.resolve(based, `./SFC/${event}.${ext}`);
      const commands = Path.resolve(based, `./Commands.${ext}`);

      // index
      let dataIndex: string;

      if (FS.existsSync(index)) {
        dataIndex = FS.readFileSync(index, "utf8");
      } else {
        dataIndex = "";
      }

      dataIndex += templateIndex(event);

      // command
      let dataCommmand: string;

      if (FS.existsSync(commands)) {
        dataCommmand = FS.readFileSync(commands, "utf8");
      } else {
        dataCommmand = "";
      }

      dataCommmand += templateCommands(event, command);

      // write
      Write.sync(sfc, templateCreate(event, command));
      Write.sync(index, dataIndex);
      Write.sync(commands, dataCommmand);
    },
  };
};
