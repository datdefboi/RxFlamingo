import React from "react";
import { action, computed, observable, reaction } from "mobx";
import Socket from "../Socket/Socket";
import { useStores } from "../../../Hooks/useStores";
import Point from "../../../shared/Point";
import UUID from "../../../shared/UUID";
import MachineCategory from "../../Models/MachineCategory";
import SocketPrototype from "../../Models/SocketPrototype";
import MachinePrototype from "../../Models/MachinePrototype";
import Wire from "../Wire/Wire";

export default class Machine {
  @observable id: UUID = UUID.Empty;
  @observable position: Point = Point.Zero;
  @observable sockets: Socket[] = [];
  @observable proto: MachinePrototype;
  @observable wires: Wire[] = [];
  @observable cacheOut = false;

  @observable state: any;

  async playCurrent() {
    await new Promise(async (resolve, reject) => {
      const deps = [];
      const depsWires = this.wires.filter(p => p.toSocket?.machine === this);
      for (var dep of depsWires) {
        var data = dep.bufferQueue;
        dep.executionRequested = true;
        if (!data) deps.push(dep.fromSocket?.machine.playCurrent());
      }
      await Promise.all(deps);
      var props = depsWires.map(p => {
        const t = p.bufferQueue;
        p.bufferQueue = null;
        return t;
      });

      var result = await this.proto.invoke(this, props);
      console.info("invocation of ", this.id.toString(), "=", result);

      const targetWires = this.wires.filter(
        p => p.fromSocket?.machine === this
      );

      const propagationQueue = [];
      for (var wire of targetWires) {
        wire.bufferQueue = result ? result : []; // TODO
        propagationQueue.push(wire.toSocket?.machine.playCurrent());
      }
      await Promise.all(propagationQueue);

      resolve();
    });
  }

  constructor(proto: MachinePrototype) {
    this.proto = proto;
    this.state = { ...proto.initShape };
    this.sockets = proto.sockets.map(p => new Socket(p, this));
    this.id = UUID.Generate();
  }

  @action
  setPosition(newPos: Point) {
    this.position = newPos;
  }
}
