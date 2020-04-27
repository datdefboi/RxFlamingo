import Factory from "../State/Factory/Factory";
import { observable } from "mobx";
import RecordType from "./RecordType";

export default class Package {
  @observable factories: Factory[] = [];
  @observable records: RecordType[] = [];
}
