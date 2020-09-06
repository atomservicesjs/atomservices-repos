import { expect } from "chai";
import * as sinon from "sinon";
import { ICommand, IEvent } from "atomservicescore";
import { createSFComponents } from "./createSFComponents";

interface ITestedCommand extends ICommand<{
  text: string;
}> { }

interface ITestedEvent extends IEvent<{
  inPayloadsText: string;
  inPayloadsNumber: number;
}> { }

const type = "InUnitTestType";
const Identifier = {
  EventID: () => "EventIDfromIdentifier",
  AggregateID: () => "AggregateIDfromIdentifier",
  type: () => type,
}

describe("createSFComponents.ts tests", () => {
  const eventName = "TestEvent";
  const commandName = "TestCommand";

  describe("#Commander", () => {
    describe("with default command", () => {
      const { Commander } = createSFComponents<ITestedEvent>({
        event: {
          name: eventName,
          process: async (event, metadata, state) => {
            state.apply(event);
          },
        },
      });

      it("expect to create a commander from event", () => {
        // arranges
        const expected = {
          name: eventName,
          payloads: {
            inPayloadsText: "text",
            inPayloadsNumber: 0,
          },
        };

        // acts
        const result = Commander({
          inPayloadsText: "text",
          inPayloadsNumber: 0,
        });

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to create a commander from event with passing properties", () => {
        // arranges
        const expected = {
          name: eventName,
          payloads: {
            inPayloadsText: "text",
            inPayloadsNumber: 0,
          },
          _createdBy: "creater",
          _version: 1,
        };

        // acts
        const result = Commander({
          inPayloadsText: "text",
          inPayloadsNumber: 0,
          _createdBy: "creater",
          _version: 1,
        });

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to create a commander from event with passing undefined properties", () => {
        // arranges
        const prop: any = undefined;
        const expected = {
          name: eventName,
          payloads: {
            inPayloadsText: "text",
          },
          _createdBy: "creater",
          _version: 1,
        };

        // acts
        const result = Commander({
          inPayloadsText: "text",
          inPayloadsNumber: prop,
          _createdBy: "creater",
          _version: 1,
        });

        // asserts
        expect(result).to.deep.equal(expected);
      });
    });

    describe("with provided command", () => {
      const { Commander } = createSFComponents<ITestedEvent, ITestedCommand>({
        event: {
          name: eventName,
          process: async (event, metadata, state) => {
            state.apply(event);
          },
        },
        command: {
          name: commandName,
        },
      });

      it("expect to create a commander from event", () => {
        // arranges
        const expected = {
          name: commandName,
          payloads: {
            text: "text",
          },
        };

        // acts
        const result = Commander({
          text: "text",
        });

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to create a commander from event with passing properties", () => {
        // arranges
        const expected = {
          name: commandName,
          payloads: {
            text: "text",
          },
          _createdBy: "creater",
          _version: 1,
        };

        // acts
        const result = Commander({
          text: "text",
          _createdBy: "creater",
          _version: 1,
        });

        // asserts
        expect(result).to.deep.equal(expected);
      });
    });

    describe("with configs", () => {
      it("expect to create a command, static", () => {
        // arranges
        const { Commander } = createSFComponents<ITestedEvent>({
          configs: {
            versioning: "static",
          },
          event: {
            name: eventName,
          },
        });
        const expected = {
          name: eventName,
          payloads: {
            inPayloadsText: "text",
            inPayloadsNumber: 0,
          },
          _version: 1,
        };

        // acts
        const result = Commander({
          inPayloadsText: "text",
          inPayloadsNumber: 0,
          _version: 1,
        });

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to throw an InvalidVersioningValueException, static #1", () => {
        // arranges
        const { Commander } = createSFComponents<ITestedEvent>({
          configs: {
            versioning: "static",
          },
          event: {
            name: eventName,
          },
        });

        // acts
        const act = () => Commander({
          inPayloadsText: "text",
          inPayloadsNumber: 0,
        });

        // asserts
        expect(act).to.throw(Error);
      });

      it("expect to throw an InvalidVersioningValueException, static #2", () => {
        // arranges
        const { Commander } = createSFComponents<ITestedEvent>({
          configs: {
            versioning: "static",
          },
          event: {
            name: eventName,
          },
        });

        // acts
        const act = () => Commander({
          inPayloadsText: "text",
          inPayloadsNumber: 0,
          _version: 0,
        });

        // asserts
        expect(act).to.throw(Error);
      });

      it("expect to throw an InvalidVersioningValueException, static #3", () => {
        // arranges
        const { Commander } = createSFComponents<ITestedEvent>({
          configs: {
            versioning: "static",
          },
          event: {
            name: eventName,
          },
        });

        // acts
        const act = () => Commander({
          inPayloadsText: "text",
          inPayloadsNumber: 0,
          _version: -1,
        });

        // asserts
        expect(act).to.throw(Error);
      });

      it("expect to create a command, none", () => {
        // arranges
        const { Commander } = createSFComponents<ITestedEvent>({
          configs: {
            versioning: "none",
          },
          event: {
            name: eventName,
          },
        });
        const expected = {
          name: eventName,
          payloads: {
            inPayloadsText: "text",
            inPayloadsNumber: 0,
          },
        };

        // acts
        const result = Commander({
          inPayloadsText: "text",
          inPayloadsNumber: 0,
        });

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to throw an InvalidVersioningValueException, none #1", () => {
        // arranges
        const { Commander } = createSFComponents<ITestedEvent>({
          configs: {
            versioning: "none",
          },
          event: {
            name: eventName,
          },
        });

        // acts
        const act = () => Commander({
          inPayloadsText: "text",
          inPayloadsNumber: 0,
          _version: 0,
        });

        // asserts
        expect(act).to.throw(Error);
      });

      it("expect to throw an InvalidVersioningValueException, none #2", () => {
        // arranges
        const { Commander } = createSFComponents<ITestedEvent>({
          configs: {
            versioning: "none",
          },
          event: {
            name: eventName,
          },
        });

        // acts
        const act = () => Commander({
          inPayloadsText: "text",
          inPayloadsNumber: 0,
          _version: -1,
        });

        // asserts
        expect(act).to.throw(Error);
      });

      it("expect to create a command, dynamic #1", () => {
        // arranges
        const { Commander } = createSFComponents<ITestedEvent>({
          configs: {
            versioning: "dynamic",
          },
          event: {
            name: eventName,
          },
        });
        const expected = {
          name: eventName,
          payloads: {
            inPayloadsText: "text",
            inPayloadsNumber: 0,
          },
        };

        // acts
        const result = Commander({
          inPayloadsText: "text",
          inPayloadsNumber: 0,
        });

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to create a command, dynamic #2", () => {
        // arranges
        const { Commander } = createSFComponents<ITestedEvent>({
          configs: {
            versioning: "dynamic",
          },
          event: {
            name: eventName,
          },
        });
        const expected = {
          name: eventName,
          payloads: {
            inPayloadsText: "text",
            inPayloadsNumber: 0,
          },
          _version: 1,
        };

        // acts
        const result = Commander({
          inPayloadsText: "text",
          inPayloadsNumber: 0,
          _version: 1,
        });

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to create a command, dynamic #3", () => {
        // arranges
        const { Commander } = createSFComponents<ITestedEvent>({
          configs: {
            versioning: "dynamic",
          },
          event: {
            name: eventName,
          },
        });
        const expected = {
          name: eventName,
          payloads: {
            inPayloadsText: "text",
            inPayloadsNumber: 0,
          },
          _version: -1,
        };

        // acts
        const result = Commander({
          inPayloadsText: "text",
          inPayloadsNumber: 0,
          _version: -1,
        });

        // asserts
        expect(result).to.deep.equal(expected);
      });
    });
  });

  describe("#CommandHandler with default command", () => {
    let timer: sinon.SinonFakeTimers;
    let now: Date;

    const { Commander, CommandHandler } = createSFComponents({
      event: {
        name: eventName,
        process: async (event: ITestedEvent, metadata, state) => {
          state.apply(event);
        },
      },
    });

    before(() => {
      now = new Date();
      timer = sinon.useFakeTimers(now.getTime());
    });

    after(() => {
      timer.restore();
    });

    it("expect CommandHandler to transform an event", () => {
      // arranges
      const command = Commander({
        inPayloadsNumber: 0,
        inPayloadsText: "text",
      });

      const expected = {
        _id: "EventIDfromIdentifier",
        type,
        aggregateID: "AggregateIDfromIdentifier",
        name: eventName,
        payloads: {
          inPayloadsText: "text",
          inPayloadsNumber: 0,
        },
        _createdAt: now,
        _createdBy: "AggregateIDfromIdentifier",
      };

      // acts
      const result = CommandHandler.transform(command, Identifier);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect CommandHandler to transform an event with passing properties", () => {
      // arranges
      const command = Commander({
        inPayloadsNumber: 0,
        inPayloadsText: "text",
        _createdBy: "creater",
        _version: 1,
      });

      const expected = {
        _id: "EventIDfromIdentifier",
        type,
        aggregateID: "AggregateIDfromIdentifier",
        name: eventName,
        payloads: {
          inPayloadsText: "text",
          inPayloadsNumber: 0,
        },
        _createdAt: now,
        _createdBy: "creater",
        _version: 1,
      };

      // acts
      const result = CommandHandler.transform(command, Identifier);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect CommandHandler to validate a command", () => {
      // arranges
      const command = Commander({
        inPayloadsNumber: 0,
        inPayloadsText: "text",
        _createdBy: "creater",
        _version: 1,
      });

      const expected = {
        isValid: true,
      };

      // acts
      const result = CommandHandler.validate(command);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });

  describe("#CommandHandler with provided command", () => {
    let timer: sinon.SinonFakeTimers;
    let now: Date;

    const { Commander, CommandHandler } = createSFComponents<ITestedEvent>({
      event: {
        name: eventName,
        process: async (event, metadata, state) => {
          state.apply(event);
        },
      },
      command: {
        name: commandName,
        transform: (command, identifier) => ({
          _id: identifier.EventID(),
          type: identifier.type(),
          name: eventName,
          aggregateID: identifier.AggregateID(),
          payloads: command.payloads,
          _createdAt: new Date(),
          _createdBy: command._createdBy || "DefaultCreater",
          _version: -1,
        }),
        validate: (command) => {
          if (command._version && command._version > 0) {
            return { isValid: true };
          } else {
            return { isValid: false };
          }
        },
      },
    });

    before(() => {
      now = new Date();
      timer = sinon.useFakeTimers(now.getTime());
    });

    after(() => {
      timer.restore();
    });

    it("expect CommandHandler to transform an event", () => {
      // arranges
      const command = Commander({
        inPayloadsNumber: 100,
        inPayloadsText: "text",
      });

      const expected = {
        _id: "EventIDfromIdentifier",
        type,
        aggregateID: "AggregateIDfromIdentifier",
        name: eventName,
        payloads: {
          inPayloadsText: "text",
          inPayloadsNumber: 100,
        },
        _createdAt: now,
        _createdBy: "DefaultCreater",
        _version: -1,
      };

      // acts
      const result = CommandHandler.transform(command, Identifier);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect CommandHandler to transform an event with passing properties", () => {
      // arranges
      const command = Commander({
        inPayloadsNumber: 100,
        inPayloadsText: "text",
        _createdBy: "creater",
      });

      const expected = {
        _id: "EventIDfromIdentifier",
        type,
        aggregateID: "AggregateIDfromIdentifier",
        name: eventName,
        payloads: {
          inPayloadsText: "text",
          inPayloadsNumber: 100,
        },
        _createdAt: now,
        _createdBy: "creater",
        _version: -1,
      };

      // acts
      const result = CommandHandler.transform(command, Identifier);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect CommandHandler to validate a command", () => {
      // arranges
      const command = Commander({
        inPayloadsNumber: 0,
        inPayloadsText: "text",
      });

      const expected = {
        isValid: false,
      };

      // acts
      const result = CommandHandler.validate(command);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });

  describe("#EventHandler with default process", () => {
    const spyStateApply = sinon.spy();
    const state = {
      apply: spyStateApply,
    };

    const { EventHandler } = createSFComponents<ITestedEvent>({
      event: {
        name: eventName,
      },
      state,
    });

    afterEach(() => {
      spyStateApply.resetHistory();
    });

    it("expect EventHandler to process an event with default process", async () => {
      // arranges
      const event: any = {};
      const metadata: any = {};

      // acts
      await EventHandler.process(event, metadata, state);

      // asserts
      expect(spyStateApply.called).to.equal(true);
      expect(spyStateApply.callCount).to.equal(1);
    });
  });

  describe("#EventHandler with provided process", () => {
    const spyEventProcess = sinon.spy();
    const spyStateApply = sinon.spy();
    const state = {
      apply: spyStateApply,
    };

    const { EventHandler } = createSFComponents<ITestedEvent>({
      event: {
        name: eventName,
        process: spyEventProcess,
      },
      state,
    });

    afterEach(() => {
      spyStateApply.resetHistory();
    });

    it("expect EventHandler to process an event with default process", async () => {
      // arranges
      const event: any = {};
      const metadata: any = {};

      // acts
      await EventHandler.process(event, metadata, state);

      // asserts
      expect(spyEventProcess.called).to.equal(true);
      expect(spyEventProcess.callCount).to.equal(1);
      expect(spyStateApply.called).to.equal(false);
    });
  });

  describe("#StateHandler with provided process", () => {
    const spyStateApply = sinon.spy();
    const state = {
      apply: spyStateApply,
    };

    const { StateHandler } = createSFComponents<ITestedEvent>({
      event: {
        name: eventName,
      },
      state,
    });

    afterEach(() => {
      spyStateApply.resetHistory();
    });

    it("expect StateHandler to apply an event with provided state", async () => {
      // arranges
      const event: any = {};

      // acts
      await StateHandler.apply(event);

      // asserts
      expect(spyStateApply.called).to.equal(true);
      expect(spyStateApply.callCount).to.equal(1);
    });
  });
});
