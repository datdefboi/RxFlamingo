import React from "react";
import AddIcon from "mdi-react/AddIcon";
import SocketType from "../../App/Models/document/SocketType";
import MachinePrototype from "../../App/Models/document/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import RecordData from "../../App/Models/execution/RecordData";
import predefinedTypeIDs from "../../App/predefinedTypeIDs";

export default class SquareRootMachine extends MachinePrototype<any> {
  sockets = [
    {
      id: 0,
      title: "X",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
    {
      id: 0,
      title: "√X",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("2e292cc7-0e20-47a9-bebe-1d605bdeb4fa");
  name = "Получить корень";
  title = "";

  async invoke(self: Machine<any>, params: RecordData[][]) {
    var numT = params[0][0].recordType!;
    return params.map((p) => {
      return [new RecordData(numT, Math.sqrt(p[0].value))];
    });
  }
}
