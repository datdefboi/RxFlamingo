import React from "react";
import AddIcon from "mdi-react/AddIcon";
import SocketType from "../../App/Models/SocketType";
import MachinePrototype from "../../App/Models/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import RecordData from "../../App/Models/Record";

export default class SquareRootMachine extends MachinePrototype {
  sockets = [
    {
      id: 0,
      title: "X",
      typeID: UUID.FromString("7690b191-7157-427e-9841-8f3576306e5b"),
      type: SocketType.Input,
    },
    {
      id: 1,
      title: "√X",
      typeID: UUID.FromString("7690b191-7157-427e-9841-8f3576306e5b"),
      type: SocketType.Output,
    },
  ];

  id = UUID.FromString("2e292cc7-0e20-47a9-bebe-1d605bdeb4fa");
  name = "Получить корень";
  title = "";

  async invoke(self: Machine, props: RecordData[]) {
    var numT = props[0].type;
    return [
      {
        fields: [],
        type: numT,
        value: Math.sqrt(props[0].value),
      },
    ];
  }
}
