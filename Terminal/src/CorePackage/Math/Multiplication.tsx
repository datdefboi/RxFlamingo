import React from "react";
import AddIcon from "mdi-react/AddIcon";
import SocketType from "../../App/Models/SocketType";
import MachinePrototype from "../../App/Models/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import RecordData from "../../App/Models/Record";

export default class MultiplicationMachine extends MachinePrototype {
  sockets = [
    {
      id: 0,
      title: "A",
      typeID: UUID.FromString("7690b191-7157-427e-9841-8f3576306e5b"),
      type: SocketType.Input,
    },
    {
      id: 1,
      title: "B",
      typeID: UUID.FromString("7690b191-7157-427e-9841-8f3576306e5b"),
      type: SocketType.Input,
    },
    {
      id: 2,
      title: "A*B",
      typeID: UUID.FromString("7690b191-7157-427e-9841-8f3576306e5b"),
      type: SocketType.Output,
    },
  ];

  id = UUID.FromString("431007ea-7593-4745-b7a8-08f2b92f45cf");
  name = "Умножить";
  title = "";

  async invoke(self: Machine, props: RecordData[]) {
    var numT = props[0].type;
    return [{
      fields: [],
      type: numT,
      value: props[0].value * props[1].value,
    }];
  }
}
