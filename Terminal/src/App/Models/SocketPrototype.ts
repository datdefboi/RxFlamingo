import SocketType from "./SocketType";
import RecordType from "./RecordType";
import UUID from "../../shared/UUID";

export default class SocketPrototype {
  title: string = "";
  id: number = 0;
  typeID: UUID = UUID.Empty;
  type: SocketType = SocketType.Output;
}
