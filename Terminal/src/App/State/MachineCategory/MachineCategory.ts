import React from "react";
import MachinePrototype from "../../Models/MachinePrototype";
import {observable} from "mobx";

export default class MachineCategory {
  name: string;
  icon: () => React.ReactNode;
  color: string;

  @observable machines: MachinePrototype[] = [];

  constructor(name: string, icon: () => React.ReactNode, color: string) {
    this.name = name;
    this.icon = icon;
    this.color = color;
  }
}
