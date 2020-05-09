import Socket from "../Socket/Socket";
import UUID from "../../../shared/UUID";
import RecordData from "../../Models/execution/RecordData";

export default class Wire {
  fromSocket: Socket | null = null;
  toSocket: Socket | null = null;
  id: UUID = UUID.Empty;

  data: RecordData[] | null = null;

  constructor(from: Socket | null, to: Socket | null) {
    this.fromSocket = from;
    this.toSocket = to;
    this.id = UUID.Generate();
  }
}
