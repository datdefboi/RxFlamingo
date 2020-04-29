import React from "react";
import SocketType from "../../App/Models/SocketType";
import MachinePrototype from "../../App/Models/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import styled from "styled-components";
import RecordTypePicker from "../../App/Components/Menus/RecordTypePicker";
import RecordType from "../../App/Models/RecordType";
import RecordData from "../../App/Models/Record";
import Wire from "../../App/Presenters/Wire/Wire";
import AppStore from "../../AppRoot/stores/AppStore";
import Socket from "../../App/Presenters/Socket/Socket";

export default class Destructor extends MachinePrototype {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: UUID.Empty,
      type: SocketType.Input,
    },
  ];

  id = UUID.FromString("f62ca30a-fb15-482d-bfc8-254168325b32");
  name = "Деструктор";
  title = "Разобрать";
  isInvocable = false;

  initShape = { type: null, value: null };

  async invoke(
    self: Machine,
    params: RecordData[]
  ): Promise<RecordData[] | null> {
    return params[0].fields; // TODO
  }

  onWireConnected(appStore: AppStore, self: Machine, wire: Wire) {
    const t = wire.fromSocket?.recordType;
    if()
    self.detachWires(
      appStore,
      (w) =>
        (w.fromSocket?.machine === self &&
          w.fromSocket.type === SocketType.Output) ||
        (w.toSocket?.machine === self && w.toSocket.type === SocketType.Output)
    );

    self.state.type = t;
    self.dynamicSockets = [];
    let i = 1;
    for (var fld of t!.fields) {
      self.dynamicSockets.push(
        new Socket(
          {
            type: SocketType.Output,
            title: fld.name,
            typeID: fld!.type!.id,
            id: i++,
          },
          appStore,
          self
        )
      );
    }
  }

  content = (self: Machine) => {
    function ChangeType(type: RecordType) {
      self.state.type = type;
    }

    return (
      <>
        <TypeWrapper>
          <RecordTypePicker
            recordType={self.state.type}
            recordTypeChanged={(type) => ChangeType(type)}
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
