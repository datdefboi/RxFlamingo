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
import Greater from "../../CorePackage/Logical/Greater";
import LogicalLog from "../../CorePackage/Widgets/LogicalLog";
import LogicalConstant from "../../CorePackage/Widgets/LogicalConstant";
import CsvFromFile from "../../CorePackage/Widgets/CsvFromFile";
import SquareMachine from "../../CorePackage/Math/Square";
import TakeFirst from "../../CorePackage/Core/Sequence/TakeFirst";
import PowerMachine from "../../CorePackage/Math/Power";
import Destributor from "../../CorePackage/Core/Sequence/Destributor";
import SummatorMachine from "../../CorePackage/Core/Aggregs/Sum";
import AveragerMachine from "../../CorePackage/Core/Aggregs/Avg";
import Lower from "../../CorePackage/Logical/Lower";
import And from "../../CorePackage/Logical/And";
import Or from "../../CorePackage/Logical/Or";
import Not from "../../CorePackage/Logical/Not";
import TakeLast from "../../CorePackage/Core/Sequence/TakeLast";
import SkipFirst from "../../CorePackage/Core/Sequence/SkipFirst";
import SubMachine from "../../CorePackage/Math/Sub";
import DivideMachine from "../../CorePackage/Math/Divide";
import SkipLast from "../../CorePackage/Core/Sequence/SkipLast";
import Equal from "../../CorePackage/Logical/Equal";
import StringConstant from "../../CorePackage/Widgets/StringConstant";
import StringLog from "../../CorePackage/Widgets/StringLog";
import Merge from "../../CorePackage/Core/Merge";

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
        new SubMachine(),
        new MultiplicationMachine(),
        new DivideMachine(),
        new SquareMachine(),
        new PowerMachine(),
        new RootMachine(),
        new SummatorMachine(),
        new AveragerMachine(),
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
      ],
    } as Package;

    const flow = {
      color: "#223f54",
      factories: [],
      machinePrototypes: [
        new Constructor(),
        new Destructor(),
        new Route(),
        new Split(),
        new Merge(),
        new Destributor(),
        new TakeFirst(),
        new TakeLast(),
        new SkipFirst(),
        new SkipLast(),
      ],
      name: "Управление",
      records: [
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
      ],
    } as Package;

    const logical = {
      color: "#522c44",
      factories: [],
      machinePrototypes: [
        new Equal(),
        new And(),
        new Or(),
        new Not(),
        new Greater(),
        new Lower(),
      ],
      name: "Логика",
      records: [
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
      ],
    } as Package;

    const string = {
      color: "#5c4b09",
      factories: [],
      machinePrototypes: [new StringConstant(), new StringLog()],
      name: "Строки",
      records: [
        {
          buildinRepresentation: "string",
          fields: [],
          color: "#695509",
          defaultValue: false,
          id: predefinedUUID.char,
          name: "Строка",
          isRenames: false,
          editable: false,
        },
      ],
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

    this.loadedPackages.push(math, flow, logical, input, output);
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
