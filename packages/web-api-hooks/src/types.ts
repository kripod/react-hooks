export type EventArgs<T> = Omit<T, keyof Event>;
export type EventMap<T> = T extends Window
  ? WindowEventMap
  : T extends Document
  ? DocumentEventMap
  : { [key: string]: Event };

export type JSONValue =
  | string
  | number
  | boolean
  | JSONArray
  | JSONObject
  | null;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JSONArray extends Array<JSONValue> {}

export interface JSONObject {
  [key: string]: JSONValue;
}
