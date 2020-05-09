import React from "react";
import AddIcon from "mdi-react/AddIcon";
import SocketType from "../../App/Models/document/SocketType";
import MachinePrototype from "../../App/Models/document/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import RecordData from "../../App/Models/execution/RecordData";
import predefinedTypeIDs from "../../App/predefinedTypeIDs";

export default class RootMachine extends MachinePrototype<any> {
  sockets = [
    {
      id: 0,
      title: "X",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
    {
      id: 1,
      title: "n",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
    {
      id: 0,
      title: "n√X",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("91d2ee8e-31e9-423d-b7b0-2dc5005a4712");
  name = "Получить корень в степени";
  title = "";
  isPerSetInvocable = true;

  async invoke(self: Machine<any>, params: RecordData[][]) {
    var numT = params[0][0].recordType!;
    return params.map((p) => {
      return [new RecordData(numT!, Math.pow(p[0].value, 1 / p[1].value))];
    });
  }
}
