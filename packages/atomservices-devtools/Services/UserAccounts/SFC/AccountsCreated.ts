import { ICommand, IEvent, SFComponents } from "atomservices";

interface ICreateAccountCommandPayloads {
}

interface ICreateAccountCommand extends ICommand<ICreateAccountCommandPayloads> {
}

interface IAccountsCreatedEventPayloads {
}

interface IAccountsCreatedEvent extends IEvent<IAccountsCreatedEventPayloads> {
}

export const { Configs, Commander, CommandHandler, EventHandler, StateHandler } =
  SFComponents.createSFComponents<IAccountsCreatedEvent, ICreateAccountCommand>({
    configs: {
    },
    command: {
      name: "CreateAccount",
    },
    event: {
      name: "AccountsCreated",
    },
    state: {
      apply: async (event) => {
      },
    },
  });
