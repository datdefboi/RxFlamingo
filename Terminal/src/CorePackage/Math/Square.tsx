import React from "react";
import AddIcon from "mdi-react/AddIcon";
import SocketType from "../../App/Models/document/SocketType";
import MachinePrototype from "../../App/Models/document/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import RecordData from "../../App/Models/execution/RecordData";
import RecordType from "../../App/Models/document/RecordType";
import predefinedTypeIDs from "../../App/predefinedTypeIDs";

export default class SquareMachine extends MachinePrototype<any> {
  sockets = [
    {
      id: 0,
      title: "A",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
    {
      id: 0,
      title: "A^2",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("421107ea-7593-4745-b7a8-08f2b92f45cf");
  name = "Квадрат";
  title = "";
  isPerSetInvocable = true;

  async invokePerSet(self: Machine<any>, params: RecordData[]) {
    var numT = params[0].recordType!;
    return [new RecordData(numT, params[0].value * params[0].value)];
  }
}
