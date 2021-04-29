import { expect } from "chai";
import { ObjectRefiner } from "./ObjectRefiner";

describe("ObjectRefiner.ts tests", () => {
  describe("#ObjectRefiner.refine()", () => {
    it("expect to refine an object by removing undefined properties", () => {
      // arranges
      const obj = {
        text: "text",
        prop1: undefined,
        prop2: undefined,
      };
      const expected = {
        text: "text",
      };

      // acts
      const result = ObjectRefiner.refine(obj);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to refine a nested object by removing undefined properties", () => {
      // arranges
      const date = new Date();
      const obj = {
        text: "text",
        prop1: undefined,
        prop2: undefined,
        nested: {
          text: "text",
          prop1: undefined,
          prop2: undefined,
          number: 0,
          array: [],
          date,
        },
      };
      const expected = {
        text: "text",
        nested: {
          text: "text",
          number: 0,
          array: [],
          date,
        },
      };

      // acts
      const result = ObjectRefiner.refine(obj);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to refine a nested object by removing undefined properties", () => {
      // arranges
      const obj = {
        text: "text",
        prop1: undefined,
        prop2: undefined,
        nested: {
          text: "text",
          prop1: undefined,
          prop2: undefined,
          number: 0,
        },
      };
      const expected = {
        text: "text",
        nested: {
          text: "text",
          number: 0,
        },
      };

      // acts
      const result = ObjectRefiner.refine(obj);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to refine a nested complex object by removing undefined properties", () => {
      // arranges
      // tslint:disable-next-line: no-empty
      const func = () => { };
      const obj = {
        text: "text",
        prop1: undefined,
        prop2: undefined,
        nested: {
          text: "text",
          prop1: undefined,
          prop2: undefined,
          fn: func,
          array: [1, "text", undefined, func],
        },
      };
      const expected = {
        text: "text",
        nested: {
          text: "text",
          fn: func,
          array: [1, "text", func],
        },
      };

      // acts
      const result = ObjectRefiner.refine(obj);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
