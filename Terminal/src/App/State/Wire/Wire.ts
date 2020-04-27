import Socket from "../Socket/Socket";
import UUID from "../../../shared/UUID";

export default class Wire {
  fromSocket: Socket | null = null;
  toSocket: Socket | null = null;
  id: UUID = UUID.Empty;

  bufferQueue: any[] | null = null;
  executionRequested = false;

  constructor(from: Socket | null, to: Socket | null) {
    this.fromSocket = from;
    this.toSocket = to;
    this.id = UUID.Generate();
  }
}
