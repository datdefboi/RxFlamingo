import React from "react";
import AddIcon from "mdi-react/AddIcon";
import SocketType from "../../App/Models/document/SocketType";
import MachinePrototype from "../../App/Models/document/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import RecordData from "../../App/Models/execution/RecordData";
import predefinedTypeIDs from "../../App/predefinedTypeIDs";

export default class Not extends MachinePrototype<any> {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: predefinedTypeIDs.bool,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
    {
      id: 0,
      title: "",
      typeID: predefinedTypeIDs.bool,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("ae5sb612-a1ee-4382-9b09-c4a5e9c296a7");
  name = "НЕ";
  title = "";
  isPerSetInvocable = true;

  async invokePerSet(self: Machine<any>, params: RecordData[]) {
    var numT = params[0].recordType;
    return [new RecordData(numT!, !params[0].value)];
  }
}
