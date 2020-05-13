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

export default class Destributor extends MachinePrototype<any> {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: predefinedTypeIDs.any,
      type: SocketType.Input,
      isVirtual: false,
      showTypeAnnotation: false,
    },
    {
      id: 0,
      title: "1 >",
      typeID: predefinedTypeIDs.any,
      type: SocketType.Output,
      isVirtual: false,
      showTypeAnnotation: false,
    },
  ];

  id = UUID.FromString("f22aa30a-fb15-482d-bfc8-254168325b32");
  name = "Распределить";
  title = "Распределитель";
  isInvocable = false;

  initShape = { type: UUID.Empty };

  async invoke(self: Machine<any>, sets: RecordData[][]) {
    const entriesN = self.dynamicSockets.length;
    const out = [];
    for (let i = 0; i < sets[0].length; i++) out.push([] as RecordData[]);
    for (let i = 0; i < sets[0].length; i++) {
      out[i % entriesN].push(sets[0][i]);
    }
    out.push([]);
    return out;
  }

  onWireConnected(self: Machine<any>, wire: Wire) {
    if (wire.toSocket?.machine == self) {
      const id = wire.fromSocket?.recordID!;
      self.sockets[0].recordID = id;
      self.sockets[1].recordID = id;
      self.dynamicSockets.forEach((e) => {
        e.recordID = id;
      });
    }
    let connectedCount = self.sockets[1].isDocked ? 1 : 0;
    for (const s of self.dynamicSockets) if (s.isDocked) connectedCount++;
    if (connectedCount == self.dynamicSockets.length + 1)
      self.dynamicSockets.push(
        new Socket(
          {
            id: connectedCount,
            showTypeAnnotation: false,
            title: connectedCount + 1 + " >",
            typeID: self.sockets[0].recordID,
            type: SocketType.Output,
          },
          self,
          false
        )
      );
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
