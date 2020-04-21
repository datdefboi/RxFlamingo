import React from "react";
import {action, observable} from "mobx";
import Point from "../../shared/Point";
import UUID from "../../shared/UUID";
import AdditionMachine from "../../machines/Math/Addition";
import SubtractionMachine from "../../machines/Math/Subtraction";
import Factory from "../../App/State/Factory/Factory";
import MachinePrototype from "../../App/Models/MachinePrototype";
import Machine from "../../App/State/Machine/Machine";
import MachineCategory from "../../App/State/MachineCategory/MachineCategory";
import Concat from "../../machines/Text/Concat";
import MathCategory from "../../machines/Math/MathCategory";
import TextCategory from "../../machines/Text/TextCategory";

export default class FactoryStore {
  @observable machinePrototypes: MachinePrototype[] = [];

  @observable machineCategories: MachineCategory[] = [];

  @observable currentFactory: Factory = new Factory();

  @action createInstance(protoId: UUID, pos: Point) {
    console.log(this.currentFactory.instances);
    const proto = this.machinePrototypes.find(p => p.id === protoId) ?? null;
    const inst = new Machine(UUID.Generate(), proto);
    inst.setPosition(pos);
    this.currentFactory.instances.push(inst);
  }

  @action initValues() {
    var mathCat = MathCategory;
    var textCat = TextCategory;

    this.machineCategories.push(...[mathCat, textCat]);

    mathCat.machines.push(
        new AdditionMachine(mathCat),
        new SubtractionMachine(mathCat)
    );
    textCat.machines.push(new Concat(textCat));

    this.machinePrototypes.push(...mathCat.machines);
    this.machinePrototypes.push(...textCat.machines);
  }
}
