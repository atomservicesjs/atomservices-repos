import { INotifyData } from "atomservicescore";
import { IConstantData } from "./IConstantData";

type ComposingNotifyData = (data: IConstantData) => (
  name: string,
  fields?: { [field: string]: any; },
  obj?: { [key: string]: any; },
  meta?: { [key: string]: any; },
) => INotifyData;

export const composeNotifyData: ComposingNotifyData = ({ action, level, message, type }) => (name, fields, obj, meta) => ({
  action,
  component: {
    name,
    type,
  },
  fields,
  level,
  message,
  obj,
  meta,
});
