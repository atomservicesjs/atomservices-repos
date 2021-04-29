export const typeOfValue = (anyValue: any): "string" | "number" | "bigint" | "boolean" | "symbol" | "null" | "undefined" | "object" | "function" | "date" | "array" => {
  const type = typeof anyValue;

  if (type === "object") {
    if (anyValue === null) {
      return "null";
    } else if (Array.isArray(anyValue)) {
      return "array";
    } else if (anyValue instanceof Date) {
      return "date";
    } else {
      return "object";
    }
  }

  return type;
};
