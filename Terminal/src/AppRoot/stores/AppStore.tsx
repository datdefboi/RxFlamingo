import React from "react";
import { action, observable, flow } from "mobx";
import Point from "../../shared/Point";
import UUID from "../../shared/UUID";
import Factory from "../../App/Presenters/Factory/Factory";
import Machine from "../../App/Presenters/Machine/Machine";
import MachineCategory from "../../App/Models/MachineCategory";
import MachinePrototype from "../../App/Models/MachinePrototype";
import AdditionMachine from "../../CorePackage/Math/Addition";
import TextLog from "../../CorePackage/Widgets/TextLog";
import RecordType from "../../App/Models/RecordType";
import Package from "../../App/Models/Package";
import FlowCategory from "../../CorePackage/Core/FlowCategory";
import Constant from "../../CorePackage/Core/Constant";
import { ContextMenuState } from "../../Hooks/useContextMenu";
import MultiplicationMachine from "../../CorePackage/Math/Multiplication";
import SquareRootMachine from "../../CorePackage/Math/SquareRoot";
import RootMachine from "../../CorePackage/Math/Root";
import Slider from "../../CorePackage/Widgets/Slider";
import Wire from "../../App/Presenters/Wire/Wire";
import Constructor from "../../CorePackage/Core/Constructor";
import Destructor from "../../CorePackage/Core/Destructor";
import Merge from "../../CorePackage/Core/Merge";

export default class AppStore {
  @observable machinePrototypes: MachinePrototype[] = [];
  @observable machineCategories: MachineCategory[] = [];
  @observable currentFactory: Factory = new Factory();
  @observable loadedPackages: Package[] = [];
  @observable contextMenu = new ContextMenuState();
  @observable currentPackage: Package = new Package();

  @action createInstance(proto: MachinePrototype, color: string, pos: Point) {
    // @ts-ignore
    const inst = new Machine(proto, this);
    inst.color = color;
    inst.setPosition(pos);
    this.currentFactory.instances.push(inst);
  }

  @action removeWire(wire: Wire | null) {
    wire?.fromSocket!.machine.wires.splice(
      wire?.fromSocket!.machine.wires.indexOf(wire as any),
      1
    );
    wire?.toSocket!.machine.wires.splice(
      wire?.toSocket!.machine.wires.indexOf(wire as any),
      1
    );
    wire!.toSocket!.isDocked = false;
    wire!.toSocket!.currentWire = null;
    wire!.fromSocket!.isDocked = false;
    wire!.fromSocket!.currentWire = null;
  }

  @action removeInstance(inst: Machine) {
    for (const wire of inst.wires) {
      this.removeWire(wire);
    }
    this.currentFactory.instances.splice(
      this.currentFactory.instances.indexOf(inst),
      1
    );
  }

  @action initDefaultPackages() {
    const math = {
      color: "#394f39",
      factories: [],
      machinePrototypes: [
        new AdditionMachine(),
        new MultiplicationMachine(),
        new SquareRootMachine(),
        new RootMachine(),
      ],
      name: "Математика",
      records: [
        {
          buildinRepresentation: "number",
          fields: [],
          defaultValue: 0,
          id: UUID.FromString("7690b191-7157-427e-9841-8f3576306e5b"),
          name: "Число",
          isRenames: false,
          editable: false,
        },
      ],
    } as Package;

    const flow = {
      color: "#4c3342",
      factories: [],
      machinePrototypes: [
        new Constant(),
        new Merge(),
        new Constructor(),
        new Destructor(),
      ],
      name: "Управление",
      records: [],
    } as Package;

    const widgets = {
      color: "#4f3732",
      factories: [],
      machinePrototypes: [new TextLog(), new Slider()],
      name: "Виджеты",
      records: [],
    } as Package;

    this.loadedPackages.push(math, flow, widgets);
  }

  @action initValues() {
    /* const mathCat = MathCategory;
    const monitorCat = MonitoringCategory;
    const textCat = TextCategory;
    const flowCat = FlowCategory;

    this.machineCategories.push(mathCat, monitorCat, textCat, flowCat);

    mathCat.machines.push(new AdditionMachine());
    monitorCat.machines.push(new TextLog());
    textCat.machines.push(new TextConstant());
    flowCat.machines.push(new InputWarp(), new Constant());

    this.machinePrototypes.push(
      ...mathCat.machines,
      ...monitorCat.machines,
      ...textCat.machines,
      ...flowCat.machines
    ); */
  }
}
