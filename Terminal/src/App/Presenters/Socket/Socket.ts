import SocketType from "../../Models/SocketType";
import Point from "../../../shared/Point";
import { observable } from "mobx";
import SocketPrototype from "../../Models/SocketPrototype";
import Machine from "../Machine/Machine";
import RecordType from "../../Models/RecordType";
import { useStores } from "../../../Hooks/useStores";
import Package from "../../Models/Package";
import AppStore from "../../../AppRoot/stores/AppStore";
import Wire from "../Wire/Wire";
import UUID from "../../../shared/UUID";

export default class Socket {
  @observable title: string = "";
  @observable machine: Machine;
  @observable id: number = 0;
  @observable type: SocketType = SocketType.Output;
  @observable isDocked: boolean = false;
  @observable recordType: RecordType | null = null;

  currentWire: Wire | null = null;

  constructor(proto: SocketPrototype, appStore: AppStore, machine: Machine) {
    const rt = [...appStore.loadedPackages, appStore.currentPackage]
      .reduce(
        (p: RecordType[], c: Package) => [...p, ...c.records],
        [] as RecordType[]
      )
      .find((r) => r.id.toString() === proto.typeID.toString());

    this.recordType = rt ?? null;
    this.title = proto.title.slice();
    this.id = proto.id;
    this.type = proto.type;
    this.machine = machine;
  }

  @observable getPositionAction: () => Point = () => Point.Zero;
}
