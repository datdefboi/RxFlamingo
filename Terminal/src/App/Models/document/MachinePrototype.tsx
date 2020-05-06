import UUID from "../../../shared/UUID";
import SocketPrototype from "./SocketPrototype";
import { action, observable } from "mobx";
import Point from "../../../shared/Point";
import React from "react";
import Machine from "../../Presenters/Machine/Machine";
import RecordData from "../execution/RecordData";
import Wire from "../../Presenters/Wire/Wire";
import AppStore from "../../../AppRoot/stores/AppStore";
import styled from "styled-components";

export default class MachinePrototype<StateT> {
  @observable id: UUID = UUID.Empty;
  @observable name: string = "";
  @observable title: string = "";
  @observable position: Point = Point.Zero;
  @observable sockets: SocketPrototype[] = [];
  @observable isInvocable = true;
  @observable isPerSetInvocable = false;

  initShape: StateT | null = null;

  async invoke(
    self: Machine<StateT>,
    params: RecordData[][]
  ): Promise<RecordData[][]> {
    return [[]];
  }

  async invokePerSet(
    self: Machine<StateT>,
    set: RecordData[]
  ): Promise<RecordData[]> {
    return [];
  }

  async doRun(self: Machine<any>) {}

  onWireConnected(self: Machine<StateT>, wire: Wire) {}

  content: (self: Machine<StateT>, appStore: AppStore) => any = (self) => <></>;

  toolstrip: (self: Machine<StateT>) => any = (self) => <></>;

  @action
  setPosition(newPos: Point) {
    this.position = newPos;
  }
}
