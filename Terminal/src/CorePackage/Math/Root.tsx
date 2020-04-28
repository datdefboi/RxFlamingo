import React from "react";
import AddIcon from "mdi-react/AddIcon";
import SocketType from "../../App/Models/SocketType";
import MachinePrototype from "../../App/Models/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import RecordData from "../../App/Models/Record";

export default class RootMachine extends MachinePrototype {
  sockets = [
    {
      id: 0,
      title: "X",
      typeID: UUID.FromString("7690b191-7157-427e-9841-8f3576306e5b"),
      type: SocketType.Input,
    },
    {
      id: 0,
      title: "n",
      typeID: UUID.FromString("7690b191-7157-427e-9841-8f3576306e5b"),
      type: SocketType.Input,
    },
    {
      id: 1,
      title: "n√X",
      typeID: UUID.FromString("7690b191-7157-427e-9841-8f3576306e5b"),
      type: SocketType.Output,
    },
  ];

  id = UUID.FromString("91d2ee8e-31e9-423d-b7b0-2dc5005a4712");
  name = "Получить корень в степени";
  title = "";

  async invoke(self: Machine, props: RecordData[]) {
    var numT = props[0].type;
    return {
      fields: [],
      type: numT,
      value: Math.pow(props[0].value, 1/props[1].value),
    } as RecordData;
  }
}
