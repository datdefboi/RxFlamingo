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

export default class Route extends MachinePrototype<any> {
  sockets = [
    {
      id: 0,
      title: "исходный",
      typeID: predefinedTypeIDs.any,
      type: SocketType.Input,
      isVirtual: false,
      showTypeAnnotation: true,
    },
    {
      id: 1,
      title: "условие",
      typeID: predefinedTypeIDs.bool,
      type: SocketType.Input,
      isVirtual: false,
      showTypeAnnotation: true,
    },
    {
      id: 0,
      title: "истина",
      typeID: predefinedTypeIDs.any,
      type: SocketType.Output,
      isVirtual: false,
      showTypeAnnotation: true,
    },
    {
      id: 1,
      title: "ложь",
      typeID: predefinedTypeIDs.any,
      type: SocketType.Output,
      isVirtual: false,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("f23ca30s-fb15-482d-bfc8-254168325b32");
  name = "Переключатель";
  title = "Переключатель";
  isInvocable = false;
  isPerSetInvocable = true;
  initShape = { type: UUID.Empty };

  async invokePerSet(self: Machine<any>, params: RecordData[]) {
    const pred = params[1].value as boolean;
    return [pred ? params[0] : null, !pred ? params[0] : null];
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
