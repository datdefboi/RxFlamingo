import React from "react";
import styled from "styled-components";
import SocketType from "../../App/Models/SocketType";
import MachinePrototype from "../../App/Models/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/State/Machine/Machine";

export default class TextConstant extends MachinePrototype {
  sockets = [
    {
      id: 0,
      title: ">",
      type: SocketType.Output
    }
  ];

  id = UUID.FromString("ff0d3a76-3727-45ad-b3d5-cc4f703b1c58\n");
  name = "Текстовая константа";
  title = "";
  isInvocable = false;

  initShape = { val: "" };

  async invoke(self: Machine, params: any[]): Promise<number[]> {
    return [self.state.val];
  }

  content = (self: Machine) => {
    return (
      <InputField
        value={self.state.val}
        onChange={ev => {
          self.state.val = ev.target.value;
        }}
        onMouseDown={ev => ev.stopPropagation()}
      />
    );
  };
}

const InputField = styled.input`
  width: 60px;
  position: relative;
  background-color: transparent;
  border: gray 1px solid;
  margin: 4px 0 4px 12px;
  padding: 0 4px;
  font-family: Consolas;
  border-radius: 8px;
  color: white;
  text-align: right;
`;
