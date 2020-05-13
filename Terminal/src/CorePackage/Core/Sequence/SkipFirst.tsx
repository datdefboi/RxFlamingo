import predefinedTypeIDs from "../../../App/predefinedTypeIDs";
import MachinePrototype from "../../../App/Models/document/MachinePrototype";
import UUID from "../../../shared/UUID";
import SocketType from "../../../App/Models/document/SocketType";
import Machine from "../../../App/Presenters/Machine/Machine";
import RecordData from "../../../App/Models/execution/RecordData";
import Wire from "../../../App/Presenters/Wire/Wire";
import Socket from "../../../App/Presenters/Socket/Socket";
import MergeIcon from "mdi-react/MergeIcon";
import React from "react";
import styled from "styled-components";

export default class SkipFirst extends MachinePrototype<any> {
  sockets = [
    {
      id: 0,
      title: "исходный",
      typeID: predefinedTypeIDs.any,
      type: SocketType.Input,
      isVirtual: false,
      showTypeAnnotation: false,
    },
    {
      id: 1,
      title: "n",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Input,
      isVirtual: false,
      showTypeAnnotation: true,
    },
    {
      id: 0,
      title: "остальные",
      typeID: predefinedTypeIDs.any,
      type: SocketType.Output,
      isVirtual: false,
      showTypeAnnotation: false,
    },
    {
      id: 1,
      title: "убраные",
      typeID: predefinedTypeIDs.any,
      type: SocketType.Output,
      isVirtual: false,
      showTypeAnnotation: false,
    },
  ];

  id = UUID.FromString("f23aa20a-fb15-482d-bfc8-254168325b32");
  name = "Пропустить первые";
  title = "Пропустить первые";
  isInvocable = false;

  initShape = { type: UUID.Empty };

  async invoke(self: Machine<any>, params: RecordData[][]) {
    const entriesN = params[1][0].value;
    const vals = params[0];
    const vO = []
    for (let i = 0; i < entriesN; i++) {
      if (i < vals.length) {
        vO.push(vals[i]);
      }
    }
    return [vals.slice(entriesN), vO];
  }

  onWireConnected(self: Machine<any>, wire: Wire) {
    if (wire.toSocket == self.sockets[0]) {
      const id = wire.fromSocket?.recordID!;
      self.sockets[0].recordID = id;
      self.sockets[2].recordID = id;
      self.sockets[3].recordID = id;
    }
  }
}

const TypeWrapper = styled.div`
  padding: 4px 12px;
  margin: 4px;
  border-radius: 20px;
  border: 1px solid gray;
  color: White;
`;

const InputField = styled.input`
  width: 60px;
  position: relative;
  background-color: transparent;
  border: gray 1px solid;
  margin: 4px 0 4px 0;
  padding: 2px 4px;
  font-size: 16px;
  border-radius: 8px;
  color: white;
  text-align: right;
`;
