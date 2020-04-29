import React from "react";
import SocketType from "../../App/Models/SocketType";
import MachinePrototype from "../../App/Models/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import styled from "styled-components";
import RecordTypePicker from "../../App/Components/Menus/RecordTypePicker";
import RecordType from "../../App/Models/RecordType";
import RecordData from "../../App/Models/Record";

export default class Slider extends MachinePrototype {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: UUID.FromString("7690b191-7157-427e-9841-8f3576306e5b"),
      type: SocketType.Output,
    },
  ];

  id = UUID.FromString("ff0d3a76-3727-45ad-b3d5-cc4f703b1c58");
  name = "Ползунок";
  title = "";
  isInvocable = false;

  initShape = { value: 50 };

  async invoke(
    self: Machine,
    params: RecordData[]
  ): Promise<RecordData[] | null> {
    return [{ type: self.state.type, fields: [], value: self.state.value }]; // TODO
  }

  content = (self: Machine) => {
    function changeVal(val: number) {
      self.state.value = val;
      self.playCurrent();
    }

    return (
      <>
        <input
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
  width:30px;
`;
