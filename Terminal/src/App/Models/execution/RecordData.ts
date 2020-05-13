import RecordType from "../document/RecordType";
import UUID from "../../../shared/UUID";
import { observable, computed } from "mobx";
import { useStores } from "../../../Hooks/useStores";

export default class RecordData {
  @observable value: any;
  @observable fields: RecordData[] = [];
  @observable recordType: RecordType | null =  null;

  constructor(t: RecordType, value: any) {
    this.recordType = t;
    this.value = value;
  }
}
