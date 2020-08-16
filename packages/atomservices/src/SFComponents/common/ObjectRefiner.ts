const isNestedObject = (obj: any) =>
  typeof obj === "object" && !Array.isArray(obj);

export const ObjectRefiner = {
  refine: (obj: { [key: string]: any; }) => {
    const initial: { [key: string]: any; } = {};

    return Object.keys(obj).reduce((result, key) => {
      const prop = obj[key];

      if (isNestedObject(prop)) {
        result[key] = ObjectRefiner.refine(prop);
      } else if (Array.isArray(prop)) {
        result[key] = prop.filter((each) => each !== undefined);
      } else if (prop !== undefined) {
        result[key] = prop;
      }

      return result;
    }, initial);
  },
};
