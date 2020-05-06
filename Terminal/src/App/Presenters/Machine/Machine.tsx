import React from "react";
import { action, computed, observable, reaction } from "mobx";
import Socket from "../Socket/Socket";
import { useStores } from "../../../Hooks/useStores";
import Point from "../../../shared/Point";
import UUID from "../../../shared/UUID";
import SocketPrototype from "../../Models/document/SocketPrototype";
import MachinePrototype from "../../Models/document/MachinePrototype";
import Wire from "../Wire/Wire";
import AppStore from "../../../AppRoot/stores/AppStore";
import { stores } from "../../../AppRoot/App";
import RecordData from "../../Models/execution/RecordData";

export default class Machine<StateT> {
  @observable id: UUID = UUID.Empty;
  @observable position: Point = Point.Zero;
  @observable sockets: Socket[] = [];
  @observable dynamicSockets: Socket[] = [];
  @observable proto: MachinePrototype<StateT>;
  @observable wires: Wire[] = [];
  @observable state: StateT;

  cache: RecordData[][] | null = null;
  isConsumationPending = false;

  color: string = "black";

  detachWires(predicate: (wire: Wire) => boolean = () => true) {
    for (var w of this.wires.filter(predicate)) stores.appStore.removeWire(w);
  }

  async consume(selfReq: boolean) {
    console.log("consume start", this.proto.title);
    const unresolvedDepsQ = [];
    const depsWires = this.wires.filter((p) => p.toSocket?.machine === this);

    /* const pendingRays = new Set<UUID>();
    for (var dep of depsWires)
      if (dep.data) dep.rays.forEach((r) => pendingRays.add(r)); */

    const inputs = [] as RecordData[][];

    for (var dep of depsWires) {
      const data = dep.data;
      if (!data) unresolvedDepsQ.push(dep.fromSocket?.machine);
      else {
        inputs.push(data);
        dep.data = null;
      }
    }

    this.cache = null;

    if (!selfReq) this.isConsumationPending = false;

    if (unresolvedDepsQ.length) {
      unresolvedDepsQ.map((d) => d?.produce());
      return;
    }

    let res: RecordData[][];
    if (this.proto.isPerSetInvocable) {
      res = [];
      const indexes = [inputs.map((p) => 0)];
      let is
    } else {
      res = await this.proto.invoke(this, inputs);
    }
    this.isConsumationPending = false;

    this.cache = res;
    if (!selfReq) await this.produce();
  }

  async produce() {
    if (!this.cache) {
      await this.consume(true);
    }

    const consumers = this.wires.filter((p) => p.fromSocket?.machine === this);

    const machinesFilled = [] as Machine<any>[];
    let i = 0;

    /*  const rays = new Set<UUID>(); */
    /*  for (var wire of consumers) { */
    /*    wire.rays.forEach((r) => rays.add(r)); */
    /*  } */
    /*  if (rays.size === 0) rays.add(UUID.Generate()); */

    for (var wire of consumers) {
      const val = this.cache![wire.fromSocket!.id];
      if (wire.data) continue;
      wire.data = val;

      wire.toSocket!.machine.isConsumationPending = true;
      /*  wire.rays = rays; */

      const propTo = wire.toSocket?.machine!;

      if (!machinesFilled.includes(propTo)) machinesFilled.push(propTo);
    }
    machinesFilled.map((c) =>
      c.isConsumationPending ? c.consume(false) : null
    );
  }

  constructor(proto: MachinePrototype<StateT>, appStore: AppStore) {
    this.proto = proto;
    this.state = Object.assign({}, proto.initShape);
    this.sockets = proto.sockets.map((p) => new Socket(p, this));
    this.dynamicSockets = [];
    this.id = UUID.Generate();
  }

  @action
  setPosition(newPos: Point) {
    this.position = newPos;
  }
}
