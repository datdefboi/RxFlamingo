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
import AppStore from "../../../AppRoot/stores/AppStore";

export default class Machine {
  @observable id: UUID = UUID.Empty;
  @observable position: Point = Point.Zero;
  @observable sockets: Socket[] = [];
  @observable dynamicSockets: Socket[] = [];
  @observable proto: MachinePrototype;
  @observable wires: Wire[] = [];
  @observable cacheOut = false;
  @observable state: any;
  color: string = "black";

  detachWires(
    appStore: AppStore,
    predicate: (wire: Wire) => boolean = () => true
  ) {
    for (var w of this.wires.filter(predicate)) appStore.removeWire(w);
  }

  async playCurrent() {
    await new Promise(async (resolve, reject) => {
      const deps = [];
      const depsWires = this.wires.filter((p) => p.toSocket?.machine === this);
      for (var dep of depsWires) {
        var data = dep.bufferQueue;
        dep.executionRequested = true;
        if (!data) deps.push(dep.fromSocket?.machine.playCurrent());
      }

      await Promise.all(deps);
      var props = depsWires.map((p) => {
        const t = p.bufferQueue;
        p.bufferQueue = null;
        return t;
      });

      var result = await this.proto.invoke(this, props);
      console.info("invocation of ", this.id.toString(), "=", result);

      const targetWires = this.wires.filter(
        (p) => p.fromSocket?.machine === this
      );

      const propagationQueue = [];
      let i = 0;
      for (var wire of targetWires) {
        wire.bufferQueue = result![i++]; // TODO
        if (wire.executionRequested == false)
          propagationQueue.push(wire.toSocket?.machine.playCurrent());
        else wire.executionRequested = false;
      }
      await Promise.all(propagationQueue);
      resolve();
    });
  }

  constructor(proto: MachinePrototype, appStore: AppStore) {
    this.proto = proto;
    this.state = { ...proto.initShape };
    this.sockets = proto.sockets.map((p) => new Socket(p, appStore, this));
    this.dynamicSockets = [];
    this.id = UUID.Generate();
  }

  @action
  setPosition(newPos: Point) {
    this.position = newPos;
  }
}
