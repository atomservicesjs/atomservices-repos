import { expect } from "chai";
import { typeOfValue } from "./typeOfValue";

describe("typeOfValue.ts tests", () => {
  describe("#typeOfValue()", () => {
    it("expect to get a 'string' type", () => {
      // arranges
      const value = "";
      const expected = "string";

      // acts
      const result = typeOfValue(value);

      // asserts
      expect(result).to.equal(expected);
    });

    it("expect to get a 'number' type", () => {
      // arranges
      const value = 0;
      const expected = "number";

      // acts
      const result = typeOfValue(value);

      // asserts
      expect(result).to.equal(expected);
    });

    it("expect to get a 'bigint' type", () => {
      // arranges
      const value = BigInt(1);
      const expected = "bigint";

      // acts
      const result = typeOfValue(value);

      // asserts
      expect(result).to.equal(expected);
    });

    it("expect to get a 'boolean' type", () => {
      // arranges
      const value = true;
      const expected = "boolean";

      // acts
      const result = typeOfValue(value);

      // asserts
      expect(result).to.equal(expected);
    });

    it("expect to get a 'symbol' type", () => {
      // arranges
      const value = Symbol("anyKey");
      const expected = "symbol";

      // acts
      const result = typeOfValue(value);

      // asserts
      expect(result).to.equal(expected);
    });

    it("expect to get a 'null' type", () => {
      // arranges
      const value = null;
      const expected = "null";

      // acts
      const result = typeOfValue(value);

      // asserts
      expect(result).to.equal(expected);
    });

    it("expect to get a 'undefined' type", () => {
      // arranges
      const value = undefined;
      const expected = "undefined";

      // acts
      const result = typeOfValue(value);

      // asserts
      expect(result).to.equal(expected);
    });

    it("expect to get a 'object' type", () => {
      // arranges
      const value = {};
      const expected = "object";

      // acts
      const result = typeOfValue(value);

      // asserts
      expect(result).to.equal(expected);
    });

    it("expect to get a 'function' type", () => {
      // arranges
      // tslint:disable-next-line: only-arrow-functions no-empty
      const value = function () { };
      const expected = "function";

      // acts
      const result = typeOfValue(value);

      // asserts
      expect(result).to.equal(expected);
    });

    it("expect to get a 'date' type", () => {
      // arranges
      const value = new Date();
      const expected = "date";

      // acts
      const result = typeOfValue(value);

      // asserts
      expect(result).to.equal(expected);
    });

    it("expect to get a 'array' type", () => {
      // arranges
      const value: any[] = [];
      const expected = "array";

      // acts
      const result = typeOfValue(value);

      // asserts
      expect(result).to.equal(expected);
    });
  });
});
