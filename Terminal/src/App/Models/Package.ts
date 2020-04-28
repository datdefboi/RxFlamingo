import Factory from "../Presenters/Factory/Factory";
import { observable } from "mobx";
import RecordType from "./RecordType";
import Machine from "../Presenters/Machine/Machine";
import MachinePrototype from "./MachinePrototype";

export default class Package {
  @observable factories: Factory[] = [];
  @observable machinePrototypes: MachinePrototype[] = [];
  @observable records: RecordType[] = [];

  @observable name: string = "Untitled package";
  @observable color: string = "gray";
}
