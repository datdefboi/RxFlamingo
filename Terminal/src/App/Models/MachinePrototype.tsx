import UUID from "../../shared/UUID";
import SocketPrototype from "./SocketPrototype";
import MachineCategory from "./MachineCategory";
import {action, observable} from "mobx";
import Point from "../../shared/Point";
import React from "react";
import Machine from "../State/Machine/Machine";

export default class MachinePrototype {
  @observable id: UUID = UUID.Empty;
  @observable name: string = "";
  @observable title: string = "";
  @observable position: Point = Point.Zero;
  @observable sockets: SocketPrototype[] = [];
  @observable category: MachineCategory;
  @observable isInvocable = true;

  initShape: any = {};

  constructor(cat: MachineCategory) {
    this.category = cat;
  }

  async invoke(self: Machine, params: any[]): Promise<any[] | void> {
    return [];
  }

  content: (self: Machine) => any = self => <></>;

  @action
  setPosition(newPos: Point) {
    this.position = newPos;
  }
}
