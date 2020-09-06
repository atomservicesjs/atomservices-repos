import { ICommand, IEvent, ISFComponents, Context, Identifiers } from "atomservices";
import { expect } from "chai";

export const SFC = <Event extends IEvent = IEvent, Command extends ICommand = ICommand<Event["payloads"], Event["_createdBy"]>, ProcessResult = any>(components: ISFComponents<Event, Command>) => {
  return {
    Command: (command: any) => {
      return {
        as: (expected: {
          name: string;
          payloads: Command["payloads"] & {
            aggregateID?: string;
          };
          _createdBy?: any;
          _version?: number | undefined;
        }) => expect(command).to.deep.equal(expected),
        validate: () =>
          expect(components.CommandHandler.validate(command).isValid).to.equal(true),
        transform: (expected: {
          name: string;
          payloads: Event["payloads"];
          _id?: any;
          aggregateID?: string;
          type?: string;
          _version?: number | undefined;
          _createdAt?: Date;
          _createdBy?: any;
        }, options?: {
          exactMatch?: boolean;
        }) => {
          const type = expected.type || "TEST";
          Context.Factories.ServiceConfigurateFactory.create({
            events: {
              [type]: components.Configs,
            },
          });
          const identifier = Context.Factories.ServiceIdentifierFactory.create(Identifiers.UUIDIdentifier, type);
          const event = components.CommandHandler.transform(command, identifier);
          const { name, payloads, ...others } = expected;

          expect(event.name).to.equal(name);
          expect(event.payloads).to.deep.equal(payloads);

          Object.keys(others).forEach((key) => expect(expected[key]).to.deep.equal(event[key]));
        },
      };
    },
    expect,
  };
};
