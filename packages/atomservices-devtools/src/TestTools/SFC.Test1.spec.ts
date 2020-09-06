import { IEvent, SFComponents } from "atomservices";
import { SFC } from "./SFC";

interface ISampleEventPayloads {
  prop: string;
}

interface ISample1Event extends IEvent<ISampleEventPayloads> {
}

const Sample = SFComponents.createSFComponents<ISample1Event>({
  event: {
    name: "SampleEvent",
  },
});

describe("TestTools/SFC.ts tests #1", () => {
  const SFCTestTools = SFC(Sample);

  describe("#Commander()", () => {
    it("expect to create a command with required properties", () => {
      // arranges

      // acts
      const command = Sample.Commander({
        prop: "value",
      });

      // asserts
      SFCTestTools.Command(command).as({
        name: "SampleEvent",
        payloads: {
          prop: "value",
        },
      });
    });
  });

  describe("#Commander()", () => {
    it("expect to create a command with required properties", () => {
      // arranges

      // acts
      const command = Sample.Commander({
        prop: "value",
      });

      // asserts
      SFCTestTools.Command(command).as({
        name: "SampleEvent",
        payloads: {
          prop: "value",
        },
      });
    });

    it("expect to create a command with required and optional properties", () => {
      // arranges

      // acts
      const command = Sample.Commander({
        aggregateID: "aggregateID",
        prop: "value",
        _createdBy: "createdBy",
        _version: 1,
      });

      // asserts
      SFCTestTools.Command(command).as({
        name: "SampleEvent",
        payloads: {
          prop: "value",
          aggregateID: "aggregateID",
        },
        _createdBy: "createdBy",
        _version: 1,
      });
    });
  });

  describe("#CommandHandler.validate()", () => {
    it("expect to validate a command", () => {
      // arranges

      // acts
      const command = Sample.Commander({
        prop: "value",
      });

      // asserts
      SFCTestTools.Command(command).validate();
    });
  });

  describe("#CommandHandler.transform()", () => {
    it("expect to transform an event with required properties", () => {
      // arranges

      // acts
      const command = Sample.Commander({
        prop: "value",
      });

      // asserts
      SFCTestTools.Command(command).transform({
        name: "SampleEvent",
        payloads: {
          prop: "value",
        },
      });
    });

    it("expect to transform an event with required and optional properties, #1", () => {
      // arranges

      // acts
      const command = Sample.Commander({
        aggregateID: "aggregateID",
        prop: "value",
        _createdBy: "createdBy",
        _version: 1,
      });

      // asserts
      SFCTestTools.Command(command).transform({
        aggregateID: "aggregateID",
        name: "SampleEvent",
        payloads: {
          prop: "value",
        },
        _createdBy: "createdBy",
        _version: 1,
      });
    });

    it("expect to transform an event with required and optional properties, #2", () => {
      // arranges

      // acts
      const command = Sample.Commander({
        aggregateID: "aggregateID",
        prop: "value",
        _createdBy: "createdBy",
        _version: -1,
      });

      // asserts
      SFCTestTools.Command(command).transform({
        aggregateID: "aggregateID",
        name: "SampleEvent",
        payloads: {
          prop: "value",
        },
        _createdBy: "createdBy",
        _version: -1,
      });
    });

    it("expect to transform an event with required and optional properties, #3", () => {
      // arranges

      // acts
      const command = Sample.Commander({
        aggregateID: "aggregateID",
        prop: "value",
        _createdBy: "createdBy",
        _version: 0,
      });

      // asserts
      SFCTestTools.Command(command).transform({
        aggregateID: "aggregateID",
        name: "SampleEvent",
        payloads: {
          prop: "value",
        },
        _createdBy: "createdBy",
        _version: 0,
      });
    });
  });
});
