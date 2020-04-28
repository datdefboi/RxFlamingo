import RecordType from "./RecordType";

export default interface RecordData {
  value: any;
  fields: RecordData[];
  type: RecordType;
}
