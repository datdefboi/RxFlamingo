import React from "react";
import AddIcon from "mdi-react/AddIcon";
import SocketType from "../../App/Models/document/SocketType";
import MachinePrototype from "../../App/Models/document/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import RecordData from "../../App/Models/execution/RecordData";
import predefinedTypeIDs from "../../App/predefinedTypeIDs";

export default class AdditionMachine extends MachinePrototype<any> {
  sockets = [
    {
      id: 0,
      title: "A",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
    {
      id: 1,
      title: "B",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
    {
      id: 0,
      title: "A+B",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("as5es614-a1ee-4382-9b09-c4a5e9c296a7");
  name = "Сложить";
  title = "Сложить";
  isPerSetInvocable = true;

  async invokePerSet(self: Machine<any>, set: RecordData[]) {
    var numT = set[0].recordType!;
    return [new RecordData(numT, set[0].value + set[1].value)];
  }
}
