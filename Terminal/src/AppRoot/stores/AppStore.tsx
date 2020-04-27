import React from "react";
import { action, observable } from "mobx";
import Point from "../../shared/Point";
import UUID from "../../shared/UUID";
import Factory from "../../App/State/Factory/Factory";
import Machine from "../../App/State/Machine/Machine";
import MachineCategory from "../../App/Models/MachineCategory";
import MachinePrototype from "../../App/Models/MachinePrototype";
import AdditionMachine from "../../CorePackage/Math/Addition";
import MathCategory from "../../CorePackage/Math/MathCategory";
import TextLog from "../../CorePackage/Monitoring/TextLog";
import InputWarp from "../../CorePackage/Flow/InputWarp";
import MonitoringCategory from "../../CorePackage/Monitoring/MonitoringCategory";
import NumericConstant from "../../CorePackage/Math/NumericConstant";
import TextConstant from "../../CorePackage/Text/TextConstant";
import RecordType from "../../App/Models/RecordType";
import TextCategory from "../../CorePackage/Text/TextCategory";
import FlowCategory from "../../CorePackage/Flow/FlowCategory";
import Package from "../../App/Models/Package";

export default class AppStore {
  @observable machinePrototypes: MachinePrototype[] = [];
  @observable machineCategories: MachineCategory[] = [];
  @observable currentFactory: Factory = new Factory();
  @observable loadedPackages: Package[] = [];

  @observable currentPackage: Package = new Package();

  @action createInstance(protoId: UUID, pos: Point) {
    console.log(this.currentFactory.instances);
    const proto = this.machinePrototypes.find((p) => p.id === protoId) ?? null;
    // @ts-ignore
    const inst = new Machine(proto);
    inst.setPosition(pos);
    this.currentFactory.instances.push(inst);
  }

  @action initValues() {
    const mathCat = MathCategory;
    const monitorCat = MonitoringCategory;
    const textCat = TextCategory;
    const flowCat = FlowCategory;

    this.machineCategories.push(mathCat, monitorCat, textCat, flowCat);

    mathCat.machines.push(
      new AdditionMachine(mathCat),
      new NumericConstant(mathCat)
    );
    monitorCat.machines.push(new TextLog(monitorCat));
    textCat.machines.push(new TextConstant(textCat));
    flowCat.machines.push(new InputWarp(flowCat));

    this.machinePrototypes.push(
      ...mathCat.machines,
      ...monitorCat.machines,
      ...textCat.machines,
      ...flowCat.machines
    );
  }
}
