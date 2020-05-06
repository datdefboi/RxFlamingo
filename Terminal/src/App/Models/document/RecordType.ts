import { observable } from "mobx";
import UUID from "../../../shared/UUID";

export default class RecordType {
  @observable name: string = "";
  @observable id: UUID = UUID.Empty;
  @observable fields: RecordField[] = [];
  @observable buildinRepresentation: string = "number";
  @observable editable = true;
  @observable defaultValue: any;
  @observable color = "teal";

  isRenames = false;
}

export class RecordField {
  @observable name: string = "";
  @observable id: UUID = UUID.Empty;
  @observable typeID: UUID = UUID.Empty;
  isRenames = false;
}
