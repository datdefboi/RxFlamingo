import React from "react";
import AddIcon from "mdi-react/AddIcon";
import SocketType from "../../App/Models/document/SocketType";
import MachinePrototype from "../../App/Models/document/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import RecordData from "../../App/Models/execution/RecordData";
import predefinedTypeIDs from "../../App/predefinedTypeIDs";

export default class And extends MachinePrototype<any> {
  sockets = [
    {
      id: 0,
      title: "A",
      typeID: predefinedTypeIDs.bool,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
    {
      id: 1,
      title: "B",
      typeID: predefinedTypeIDs.bool,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
    {
      id: 0,
      title: "A&B",
      typeID: predefinedTypeIDs.bool,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("ae5eb614-a1ee-4282-9b09-c4a5e9c296a7");
  name = "И";
  title = "";
  isPerSetInvocable = true;

  async invokePerSet(self: Machine<any>, params: RecordData[]) {
    var numT = params[1].recordType;
    return [new RecordData(numT!, params[0].value && params[1].value)];
  }
}
