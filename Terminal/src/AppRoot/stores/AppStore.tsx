import React from "react";
import { action, observable } from "mobx";
import Point from "../../shared/Point";
import UUID from "../../shared/UUID";
import Factory from "../../App/State/Factory/Factory";
import Machine from "../../App/State/Machine/Machine";
import MachineCategory from "../../App/Models/MachineCategory";
import MachinePrototype from "../../App/Models/MachinePrototype";
import AdditionMachine from "../../CorePackage/machines/Math/Addition";
import MathCategory from "../../CorePackage/machines/Math/MathCategory";
import NumericConstant from "../../CorePackage/machines/Math/NumericConstant";
import MonitoringCategory from "../../CorePackage/machines/Monitoring/MonitoringCategory";
import TextLog from "../../CorePackage/machines/Monitoring/TextLog";
import TextCategory from "../../CorePackage/machines/Text/TextCategory";
import TextConstant from "../../CorePackage/machines/Text/TextConstant";

export default class FactoryStore {
  @observable machinePrototypes: MachinePrototype[] = [];
  @observable machineCategories: MachineCategory[] = [];
  @observable currentFactory: Factory = new Factory();

  @action createInstance(protoId: UUID, pos: Point) {
    console.log(this.currentFactory.instances);
    const proto = this.machinePrototypes.find(p => p.id === protoId) ?? null;
    // @ts-ignore
    const inst = new Machine(proto);
    inst.setPosition(pos);
    this.currentFactory.instances.push(inst);
  }

  @action initValues() {
    const mathCat = MathCategory;
    const monitorCat = MonitoringCategory;
    const textCat = TextCategory;

    this.machineCategories.push(...[mathCat, monitorCat, textCat]);

    mathCat.machines.push(
      new AdditionMachine(mathCat),
      new NumericConstant(mathCat)
    );
    monitorCat.machines.push(new TextLog(monitorCat));
    textCat.machines.push(new TextConstant(textCat));

    this.machinePrototypes.push(
      ...mathCat.machines,
      ...monitorCat.machines,
      ...textCat.machines
    );
  }
}
