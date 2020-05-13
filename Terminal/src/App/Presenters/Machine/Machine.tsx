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
  waitsForData = false;

  color: string = "black";

  detachWires(predicate: (wire: Wire) => boolean = () => true) {
    for (var w of this.wires.filter(predicate)) stores.appStore.removeWire(w);
  }

  async execute() {
    console.log("consume start", this.proto.title);

    const unresolvedDepsQ = [];
    const depsWires = this.wires.filter((p) => p.toSocket?.machine === this);

    const inputs = [] as RecordData[][];

    for (var dep of depsWires) {
      const data = dep.data;
      if (!data) {
        unresolvedDepsQ.push(dep.fromSocket?.machine);
      }
    }

    this.cache = null;

    //if (!selfReq) this.isConsumationPending = false;

    if (unresolvedDepsQ.length) {
      this.waitsForData = true;

      if (unresolvedDepsQ.some((p) => p?.waitsForData)) {
        this.waitsForData = false;
        return;
      }

      for (const dep of unresolvedDepsQ)
        if (!this.cache) {
          await dep?.execute();
        }
      this.waitsForData = false;
    }

    for (var dep of depsWires) {
      inputs.push(dep.data!);
      dep.data = null;
    }

    let res: RecordData[][];
    if (this.proto.isPerSetInvocable) {
      res = [];

      const indexes = inputs.map((p) => 0);

      const paramsCount = inputs.length;
      const lengths = inputs.map((v) => v.length);
      const maxQ = Math.max(...lengths);

      if (!lengths.includes(0)) {
        for (let i = 0; i < maxQ; i++) {
          let set = [];
          for (let i = 0; i < paramsCount; i++) {
            let paramVal = inputs[i][indexes[i]];
            if (paramVal == undefined) {
              paramVal = inputs[i][0];
              indexes[i] = 1;
            }
            indexes[i]++;
            set.push(paramVal);
          }
          const out = await this.proto.invokePerSet(this, set);
          if (!res.length) res = out.map((p) => []);
          for (let i = 0; i < out.length; i++) if (out[i]) res[i].push(out[i]!);
        }
      }
    } else {
      res = await this.proto.invoke(this, inputs);
    }

    this.cache = res;

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
      if (wire.data && wire.data.length) continue;
      wire.data = val;
      if (!val.length) continue;

      /*  wire.rays = rays; */

      const propTo = wire.toSocket?.machine!;
      if (
        !wire.toSocket?.machine.waitsForData &&
        wire.data &&
        !machinesFilled.includes(propTo)
      )
        machinesFilled.push(propTo);
    }
    for (const m of machinesFilled) await m.execute();
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
