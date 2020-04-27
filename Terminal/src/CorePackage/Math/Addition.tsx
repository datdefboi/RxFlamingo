
import React from "react";
import AddIcon from "mdi-react/AddIcon";
import SocketType from "../../App/Models/SocketType";
import MachinePrototype from "../../App/Models/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/State/Machine/Machine";

export default class AdditionMachine extends MachinePrototype {
  sockets = [
    {
      id: 0,
      title: "A",
      type: SocketType.Input
    },
    {
      id: 1,
      title: "B",
      type: SocketType.Input
    },
    {
      id: 2,
      title: "A+B",
      type: SocketType.Output
    }
  ];

  id = UUID.FromString("ae5eb614-a1ee-4382-9b09-c4a5e9c296a7");
  name = "Суммирование";
  title = "Сумма";

  async invoke(self: Machine, props: number[][]) {
    return [props[0][0] + props[1][0]];
  }
}
