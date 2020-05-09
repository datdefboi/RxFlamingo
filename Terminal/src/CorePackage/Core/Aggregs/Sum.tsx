import React from "react";
import AddIcon from "mdi-react/AddIcon";
import SocketType from "../../../App/Models/document/SocketType";
import MachinePrototype from "../../../App/Models/document/MachinePrototype";
import UUID from "../../../shared/UUID";
import Machine from "../../../App/Presenters/Machine/Machine";
import RecordData from "../../../App/Models/execution/RecordData";
import predefinedTypeIDs from "../../../App/predefinedTypeIDs";

export default class SummatorMachine extends MachinePrototype<any> {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
    {
      id: 0,
      title: "∑",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("as5eb612-a1ee-4383-9b09-c4a5e9c296a7");
  name = "Сумма ряда";
  title = "";

  async invoke(self: Machine<any>, sets: RecordData[][]) {
    let sum = 0;
    for (let i = 0; i < sets[0].length; i++) {
      sum += sets[0][i].value;
    }
    return [[new RecordData(self.sockets[0].recordType!, sum)]];
  }
}
