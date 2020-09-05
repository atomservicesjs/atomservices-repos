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
  command: {
    name: "SampleCommand",
  },
});

describe("TestTools/SFC.ts tests #2", () => {
  describe("#Commander", () => {
    const SFCTestTools = SFC(Sample);

    it("expect to create a command with required properties", () => {
      // arranges

      // acts
      const command = Sample.Commander({
        prop: "value",
      });

      // asserts
      SFCTestTools.Command(command).as({
        name: "SampleCommand",
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
        name: "SampleCommand",
        payloads: {
          prop: "value",
          aggregateID: "aggregateID",
        },
        _createdBy: "createdBy",
        _version: 1,
      });
    });
  });
});
