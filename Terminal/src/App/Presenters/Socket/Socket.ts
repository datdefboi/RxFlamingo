import SocketType from "../../Models/document/SocketType";
import Point from "../../../shared/Point";
import { observable, computed } from "mobx";
import SocketPrototype from "../../Models/document/SocketPrototype";
import Machine from "../Machine/Machine";
import RecordType from "../../Models/document/RecordType";
import { useStores } from "../../../Hooks/useStores";
import Package from "../../Models/document/Package";
import AppStore from "../../../AppRoot/stores/AppStore";
import Wire from "../Wire/Wire";
import UUID from "../../../shared/UUID";
import { storesContext, stores } from "../../../AppRoot/App";

export default class Socket {
  @observable title: string = "";
  @observable machine: Machine<any>;
  @observable id: number = 0;
  @observable type: SocketType = SocketType.Output;
  @observable isDocked: boolean = false;
  @observable recordID: UUID = UUID.Empty;

  showAnnotation = false;

  @computed
  get recordType() {
    const { appStore } = stores;
    const rec = appStore.findRecordTypeByID(this.recordID);
    return rec;
  }

  currentWire: Wire | null = null;
  isVirtual: boolean = false;

  constructor(
    proto: SocketPrototype,
    machine: Machine<any>,
    isVirtual = false
  ) {
    this.title = proto.title.slice();
    this.id = proto.id;
    this.recordID = proto.typeID;
    this.showAnnotation = proto.showTypeAnnotation;
    this.isVirtual = isVirtual;
    this.type = proto.type;
    this.machine = machine;
  }

  @observable getPositionAction: () => Point = () => Point.Zero;
}
