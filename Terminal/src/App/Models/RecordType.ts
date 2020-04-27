import { observable } from "mobx";
import UUID from "../../shared/UUID";

export default class RecordType {
  @observable name: string = "";
  @observable id: UUID = UUID.Empty;
  @observable fields: RecordField[] = [];
  @observable buildinRepresentation: string = "number";

  isRenames = false;
}

export class RecordField {
  @observable name: string = "";
  @observable id: UUID = UUID.Empty;
  @observable type: RecordType | null = null;

  isRenames = false;
}
