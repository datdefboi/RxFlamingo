import React from "react";
import SocketType from "../../App/Models/document/SocketType";
import MachinePrototype from "../../App/Models/document/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import styled from "styled-components";
import RecordTypePicker from "../../App/Components/Menus/RecordTypePicker";
import RecordType from "../../App/Models/document/RecordType";
import RecordData from "../../App/Models/execution/RecordData";
import Wire from "../../App/Presenters/Wire/Wire";
import AppStore from "../../AppRoot/stores/AppStore";
import Socket from "../../App/Presenters/Socket/Socket";
import { stores } from "../../AppRoot/App";
import { useObserver } from "mobx-react-lite";
import predefinedTypeIDs from "../../App/predefinedTypeIDs";

interface State {
  typeID: UUID;
}

export default class Destructor extends MachinePrototype<State> {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: predefinedTypeIDs.any,
      type: SocketType.Input,
      isVirtual: false,
      showTypeAnnotation: true,
    },
    {
      id: 0,
      title: "исходный",
      typeID: predefinedTypeIDs.any,
      type: SocketType.Output,
      isVirtual: false,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("f62ca30a-fb15-482d-bfc8-254168325b32");
  name = "Деструктор";
  title = "Разобрать";
  isInvocable = false;
  isPerSetInvocable = true;

  initShape = { typeID: UUID.Empty };

  async invokePerSet(self: Machine<any>, params: RecordData[]) {
    return [params[0], ...params[0].fields];
  }

  onWireConnected(self: Machine<any>, wire: Wire) {
    const t = wire.fromSocket?.recordType;
    if (wire.toSocket === self.sockets[0])
      this.ChangeType(self, t!.id, (w) => w !== wire);
  }

  ChangeType(self: Machine<State>, id: UUID, pred: (w: Wire) => boolean) {
    self.detachWires(pred);

    self.state.typeID = id;
    self.sockets[0].recordID = id;
    self.sockets[1].recordID = id;
    self.dynamicSockets = [];
    let i = 1;
    for (var fld of stores.appStore.findRecordTypeByID(id)!.fields) {
      self.dynamicSockets.push(
        new Socket(
          {
            type: SocketType.Output,
            title: fld.name,
            typeID: fld!.typeID,
            id: i++,
            showTypeAnnotation: true,
          },
          self
        )
      );
    }
  }

  content = (self: Machine<State>) => {
    return useObserver(() => (
      <>
        <TypeWrapper>
          <RecordTypePicker
            recordID={self.state.typeID}
            recordIDChanged={(id) => this.ChangeType(self, id, (w) => true)}
          />
        </TypeWrapper>
      </>
    ));
  };
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
