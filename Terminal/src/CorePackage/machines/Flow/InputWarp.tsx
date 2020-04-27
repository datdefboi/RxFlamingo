
import React from "react";
import AddIcon from "mdi-react/AddIcon";
import SocketType from "../../../App/Models/SocketType";
import MachinePrototype from "../../../App/Models/MachinePrototype";
import UUID from "../../../shared/UUID";
import Machine from "../../../App/State/Machine/Machine";

export default class Warp extends MachinePrototype {
  sockets = [
    {
      id: 0,
      title: "",
      type: SocketType.Output
    }
  ];

  id = UUID.FromString("f21b09e2-15a6-490e-8877-7ff318de8f7b");
  name = "Входное значение";
  title = "Параметер";

  async invoke(self: Machine, props: number[][]) {

  }
}
