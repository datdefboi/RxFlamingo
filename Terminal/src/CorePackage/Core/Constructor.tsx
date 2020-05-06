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
import predefinedUUID from "../../App/predefinedTypeIDs";

interface State {
  typeID: UUID;
}

export default class Constructor extends MachinePrototype<any> {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: predefinedUUID.any,
      type: SocketType.Output,
      isVirtual: false,
      showTypeAnnotation: false,
    },
  ];

  id = UUID.FromString("f63ca30a-fb15-482d-bfc8-254168325b32");
  name = "Конструктор";
  title = "Сконструировать";
  isInvocable = false;

  initShape = { type: UUID.Empty };

  async invoke(self: Machine<any>, params: RecordData[][]) {
    const numT = self.state.type.id!;
    return [
      params.map((p) => {
        const out = new RecordData(numT, null);
        out.fields = p;
        return out;
      }),
    ]; // TODO
  }

  onWireConnected(self: Machine<any>, wire: Wire) {}

  content = (self: Machine<any>, appStore: AppStore) => {
    const changeType = (t: UUID) => {
      self.state.type = t;

      self.detachWires();

      self.state.type = t;
      self.sockets[0].recordID = t;
      self.dynamicSockets = [];
      let i = 0;
      for (var fld of self.sockets[0].recordType!.fields) {
        self.dynamicSockets.push(
          new Socket(
            {
              type: SocketType.Input,
              title: fld.name,
              typeID: fld.typeID,
              id: i++,
              showTypeAnnotation: true,
            },
            self
          )
        );
      }
    };

    return (
      <>
        <TypeWrapper>
          <RecordTypePicker
            recordID={self.state.type}
            recordIDChanged={(id) => changeType(id)}
          />
        </TypeWrapper>
      </>
    );
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
