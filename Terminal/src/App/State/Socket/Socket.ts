import SocketType from "../../Models/SocketType";
import Point from "../../../shared/Point";
import {observable} from "mobx";
import SocketPrototype from "../../Models/SocketPrototype";
import Machine from "../Machine/Machine";

export default class Socket {
  @observable title: string = "";
  @observable machine: Machine;
  @observable id: number = 0;
  @observable type: SocketType = SocketType.Output;
  @observable isDocked: boolean = false;

  constructor(proto: SocketPrototype, machine: Machine) {
    this.title = proto.title.slice();
    this.id = proto.id;
    this.type = proto.type;
    this.machine = machine;
  }

  @observable getPositionAction: () => Point = () => Point.Zero;
}
