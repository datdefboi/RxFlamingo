import React from "react";
import { action, observable, flow } from "mobx";
import Point from "../../shared/Point";
import UUID from "../../shared/UUID";
import Factory from "../../App/Presenters/Factory/Factory";
import Machine from "../../App/Presenters/Machine/Machine";
import MachinePrototype from "../../App/Models/document/MachinePrototype";
import AdditionMachine from "../../CorePackage/Math/Addition";
import NumberLog from "../../CorePackage/Widgets/NumberLog";
import RecordType from "../../App/Models/document/RecordType";
import Package from "../../App/Models/document/Package";
import NumericConstant from "../../CorePackage/Widgets/NumericConstant";
import { ContextMenuState } from "../../Hooks/useContextMenu";
import MultiplicationMachine from "../../CorePackage/Math/Multiplication";
import SquareRootMachine from "../../CorePackage/Math/SquareRoot";
import RootMachine from "../../CorePackage/Math/Root";
import Slider from "../../CorePackage/Widgets/Slider";
import Wire from "../../App/Presenters/Wire/Wire";
import Constructor from "../../CorePackage/Core/Constructor";
import Destructor from "../../CorePackage/Core/Destructor";
import Graph from "../../CorePackage/Widgets/Graph";
import predefinedUUID from "../../App/predefinedTypeIDs";
import Split from "../../CorePackage/Core/Split";
import Range from "../../CorePackage/Widgets/Range";
import Route from "../../CorePackage/Core/Route";
import Greater from "../../CorePackage/Math/logical/Greater";
import LogicalLog from "../../CorePackage/Widgets/LogicalLog";
import LogicalConstant from "../../CorePackage/Widgets/LogicalConstant";
import CsvFromFile from "../../CorePackage/Widgets/CsvFromFile";
import SquareMachine from "../../CorePackage/Math/Square";
import TakeFirst from "../../CorePackage/Core/Sequence/TakeFirst";

export default class AppStore {
  @observable currentFactory: Factory = new Factory();
  @observable loadedPackages: Package[] = [];
  @observable contextMenu = new ContextMenuState();
  @observable currentPackage: Package = new Package();

  @action createInstance(
    proto: MachinePrototype<any>,
    color: string,
    pos: Point
  ) {
    // @ts-ignore
    const inst = new Machine(proto, this);
    inst.color = color;
    inst.setPosition(pos.sub(this.currentFactory.viewOffset));
    this.currentFactory.instances.push(inst);
  }

  @action removeWire(wire: Wire | null) {
    const fromWires = wire?.fromSocket!.machine.wires;
    fromWires.splice(fromWires.indexOf(wire as any), 1);
    const toWires = wire?.toSocket!.machine.wires;
    toWires.splice(toWires.indexOf(wire as any), 1);

    wire!.toSocket!.isDocked = false;
    wire!.toSocket!.currentWire = null;
    wire!.fromSocket!.isDocked = false;
    wire!.fromSocket!.currentWire = null;
  }

  @action removeInstance(inst: Machine<any>) {
    for (const wire of inst.wires) {
      this.removeWire(wire);
    }
    this.currentFactory.instances.splice(
      this.currentFactory.instances.indexOf(inst),
      1
    );
  }

  @action findRecordTypeByID(id: UUID) {
    const arrays = [
      this.currentPackage.records,
      ...this.loadedPackages.map((p) => p.records),
    ];
    const perEach = arrays.map((a) =>
      a.find((p) => p.id.toString() === id.toString())
    );
    const res = perEach.find((p) => p !== undefined);
    return res;
  }

  @action findRecordTypeByName(name: string) {
    return [
      this.currentPackage.records,
      ...this.loadedPackages.map((p) => p.records),
    ]
      .map((a) => a.find((p) => p.name === name))
      .find((p) => p !== undefined);
  }

  @action save() {
    console.log(JSON.stringify(this.currentFactory));
  }

  @action initDefaultPackages() {
    const math = {
      color: "#394f39",
      factories: [],
      machinePrototypes: [
        new AdditionMachine(),
        new MultiplicationMachine(),
        new SquareMachine(),
        new RootMachine(),
        new Greater(),
      ],
      name: "Математика",
      records: [
        {
          buildinRepresentation: "number",
          fields: [],
          color: "#416b41",
          defaultValue: 0,
          id: predefinedUUID.number,
          name: "Число",
          isRenames: false,
          editable: false,
        },
        {
          buildinRepresentation: "any",
          fields: [],
          color: "#1b1b2f",
          defaultValue: null,
          id: predefinedUUID.any,
          name: "Любой",
          isRenames: false,
          editable: false,
        },
        {
          buildinRepresentation: "boolean",
          fields: [],
          color: "#e43f5a",
          defaultValue: false,
          id: predefinedUUID.bool,
          name: "Логический",
          isRenames: false,
          editable: false,
        },
        {
          buildinRepresentation: null,
          fields: [
            {
              typeID: predefinedUUID.number,
              id: 0,
              name: "х",
              isRenames: false,
            },
            {
              typeID: predefinedUUID.number,
              id: 1,
              name: "y",
              isRenames: false,
            },
          ],
          defaultValue: 0,
          id: UUID.FromString("c517721a-f1f5-4f2d-9f61-ffd6481d63ec"),
          name: "Вектор",
          color: "teal",
          isRenames: false,
          editable: false,
        },
      ],
    } as Package;

    const flow = {
      color: "#4c3342",
      factories: [],
      machinePrototypes: [
        new Constructor(),
        new Destructor(),
        new Route(),
        new Split(),
        new TakeFirst(),
      ],
      name: "Управление",
      records: [],
    } as Package;

    const output = {
      color: "#004445",
      factories: [],
      machinePrototypes: [new NumberLog(), new LogicalLog(), new Graph()],
      name: "Вывод",
      records: [],
    } as Package;

    const input = {
      color: "#004445",
      factories: [],
      machinePrototypes: [
        new NumericConstant(),
        new LogicalConstant(),
        new Slider(),
        new Range(),
        new CsvFromFile(),
      ],
      name: "Ввод",
      records: [],
    } as Package;

    this.loadedPackages.push(math, flow, input, output);
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
