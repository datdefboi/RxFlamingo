import React from "react";
import AddIcon from "mdi-react/AddIcon";
import SocketType from "../../App/Models/document/SocketType";
import MachinePrototype from "../../App/Models/document/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import RecordData from "../../App/Models/execution/RecordData";
import predefinedTypeIDs from "../../App/predefinedTypeIDs";

export default class PowerMachine extends MachinePrototype<any> {
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
      title: "X^n",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("2e292cs6-0e20-47a9-bebe-1d603bdeb4fa");
  name = "В степени";
  title = "";
  isPerSetInvocable = true;

  async invokePerSet(self: Machine<any>, params: RecordData[]) {
    var numT = params[0].recordType!;
    return [new RecordData(numT, Math.pow(params[0].value, params[1].value))];
  }
}
