import React from "react";
import AddIcon from "mdi-react/AddIcon";
import SocketType from "../../../App/Models/document/SocketType";
import MachinePrototype from "../../../App/Models/document/MachinePrototype";
import UUID from "../../../shared/UUID";
import Machine from "../../../App/Presenters/Machine/Machine";
import RecordData from "../../../App/Models/execution/RecordData";
import predefinedTypeIDs from "../../../App/predefinedTypeIDs";

export default class Greater extends MachinePrototype<any> {
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
      title: "A>B",
      typeID: predefinedTypeIDs.bool,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("ae5eb614-a1ee-4382-9b09-c4a5e9c296a7");
  name = "Если больше";
  title = "";

  async invoke(self: Machine<any>, params: RecordData[][]) {
    return params.map((p) => {
      var numT = p[1].recordType;
      return [new RecordData(numT!, p[0].value > p[1].value)];
    });
  }
}
