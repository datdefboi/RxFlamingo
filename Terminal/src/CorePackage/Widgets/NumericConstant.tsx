import React from "react";
import SocketType from "../../App/Models/document/SocketType";
import MachinePrototype from "../../App/Models/document/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import styled from "styled-components";
import RecordTypePicker from "../../App/Components/Menus/RecordTypePicker";
import RecordType from "../../App/Models/document/RecordType";
import RecordData from "../../App/Models/execution/RecordData";
import AppStore from "../../AppRoot/stores/AppStore";
import { useStores } from "../../Hooks/useStores";
import { stores } from "../../AppRoot/App";
import predefinedTypeIDs from "../../App/predefinedTypeIDs";

interface State {
  value: number;
}

export default class NumericConstant extends MachinePrototype<State> {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Output,
      isVirtual: false,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("9bb9b32c-076b-4110-9ca2-a8a7e09cb295");
  name = "Число";
  title = "";
  isInvocable = false;

  initShape = { value: 0 };

  async invoke(
    self: Machine<any>,
    params: RecordData[][]
  ){
    return [
      [
        new RecordData(
          stores.appStore.findRecordTypeByName("Число")!,
          self.state.value
        ),
      ],
    ]; // TODO
  }

  content = (self: Machine<State>) => {
    return (
      <>
        <InputField
          onMouseDown={(ev) => ev.stopPropagation()}
          value={self.state.value}
          onChange={(ev) => (self.state.value = +ev.target.value)}
        />
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
