import React from "react";
import SocketType from "../../App/Models/document/SocketType";
import MachinePrototype from "../../App/Models/document/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import styled from "styled-components";
import RecordTypePicker from "../../App/Components/Menus/RecordTypePicker";
import RecordType from "../../App/Models/document/RecordType";
import RecordData from "../../App/Models/execution/RecordData";
import predefinedTypeIDs from "../../App/predefinedTypeIDs";

interface State {
  value: number;
}

export default class Slider extends MachinePrototype<State> {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("ff0d3a76-3727-45ad-b3d5-cc4f703b1c58");
  name = "Ползунок";
  title = "";
  isInvocable = false;

  initShape = { value: 0 };

  async invoke(self: Machine<any>, params: RecordData[][]) {
    return [[new RecordData(self.sockets[0].recordType!, self.state.value)]]; // TODO
  }

  content = (self: Machine<State>) => {
    async function changeVal(val: number) {
      self.state.value = val;
      self.cache = null;
      self.execute();
    }

    return (
      <>
        <input
          max={1}
          min={0}
          step={0.01}
          onMouseDown={(ev) => ev.stopPropagation()}
          value={self.state.value}
          onChange={(ev) => changeVal(+ev.target.value)}
          type={"range"}
        />
        <ValueWrap>{self.state.value}</ValueWrap>
      </>
    );
  };
}

const ValueWrap = styled.div`
  color: white;
  padding: 4px;
  width: 30px;
`;
