import UUID from "../../shared/UUID";
import SocketPrototype from "./SocketPrototype";
import MachineCategory from "./MachineCategory";
import { action, observable } from "mobx";
import Point from "../../shared/Point";
import React from "react";
import Machine from "../Presenters/Machine/Machine";
import RecordData from "./Record";
import Wire from "../Presenters/Wire/Wire";
import AppStore from "../../AppRoot/stores/AppStore";

export default class MachinePrototype {
  @observable id: UUID = UUID.Empty;
  @observable name: string = "";
  @observable title: string = "";
  @observable position: Point = Point.Zero;
  @observable sockets: SocketPrototype[] = [];
  @observable isInvocable = true;

  initShape: any = {};
  async invoke(self: Machine, params: any[]): Promise<RecordData[] | null> {
    return null;
  }

  onWireConnected(appStore: AppStore, self: Machine, wire: Wire) {}

  content: (self: Machine, appStore: AppStore) => any = (self) => <></>;

  @action
  setPosition(newPos: Point) {
    this.position = newPos;
  }
}
