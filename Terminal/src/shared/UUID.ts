import {v4} from "uuid";

export default class UUID {
  static Empty = new UUID("");
  private data: string;

  private constructor(data: string) {
    this.data = data;
  }

  static Generate(): UUID {
    return new UUID(v4());
  }

  static FromString(data: string) {
    return new UUID(data);
  }

  toString() {
    return this.data
  }
}
