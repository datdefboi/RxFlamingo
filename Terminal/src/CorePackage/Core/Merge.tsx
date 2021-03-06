import React from "react";
import SocketType from "../../App/Models/document/SocketType";
import MachinePrototype from "../../App/Models/document/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import styled from "styled-components";
import RecordTypePicker from "../../App/Components/Menus/RecordTypePicker";
import RecordType, { RecordField } from "../../App/Models/document/RecordType";
import RecordData from "../../App/Models/execution/RecordData";
import Wire from "../../App/Presenters/Wire/Wire";
import Socket from "../../App/Presenters/Socket/Socket";
import AppStore from "../../AppRoot/stores/AppStore";
import { useStores } from "../../Hooks/useStores";
import predefinedTypeIDs from "../../App/predefinedTypeIDs";
import MergeIcon from "mdi-react/MergeIcon";

interface State {
  typeID: UUID;
}

export default class Merge extends MachinePrototype<any> {
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
      title: "",
      typeID: predefinedTypeIDs.any,
      type: SocketType.Output,
      isVirtual: false,
      showTypeAnnotation: false,
    },
  ];

  id = UUID.FromString("f23aa30a-fb15-482d-bsc8-254168325b32");
  name = "Обьединить";
  title = "";
  isInvocable = false;

  initShape = { type: UUID.Empty };

  async invoke(self: Machine<any>, params: RecordData[][]) {
    return [params.flat()]
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
    let connectedCount = self.sockets[0].isDocked ? 1 : 0;
    for (const s of self.dynamicSockets) if (s.isDocked) connectedCount++;
    if (connectedCount == self.dynamicSockets.length + 1)
      self.dynamicSockets.push(
        new Socket(
          {
            id: connectedCount,
            showTypeAnnotation: false,
            title: "",
            typeID: self.sockets[0].recordID,
            type: SocketType.Input,
          },
          self,
          false
        )
      );
  }

  content = (self: Machine<any>) => (
    <MergeIcon style={{ color: "white" }} size={20} />
  );
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
