import UUID from "../../shared/UUID";
import SocketPrototype from "./SocketPrototype";
import MachineCategory from "./MachineCategory";
import {action, observable} from "mobx";
import Point from "../../shared/Point";
import React from "react";
import Machine from "../Presenters/Machine/Machine";
import RecordData from "./Record";

export default class MachinePrototype {
  @observable id: UUID = UUID.Empty;
  @observable name: string = "";
  @observable title: string = "";
  @observable position: Point = Point.Zero;
  @observable sockets: SocketPrototype[] = [];
  @observable isInvocable = true;

  initShape: any = {};
  async invoke(self: Machine, params: any[]): Promise<RecordData | null> {
    return null;
  }

  content: (self: Machine) => any = self => <></>;

  @action
  setPosition(newPos: Point) {
    this.position = newPos;
  }
}
