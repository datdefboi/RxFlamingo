import React from "react";
import SocketType from "../../../App/Models/SocketType";
import MachinePrototype from "../../../App/Models/MachinePrototype";
import UUID from "../../../shared/UUID";
import Machine from "../../../App/State/Machine/Machine";
import styled from "styled-components";

export default class NumericConstant extends MachinePrototype {
  sockets = [
    {
      id: 0,
      title: ">",
      type: SocketType.Output
    }
  ];

  id = UUID.FromString("ff0d3a76-3727-45ad-b3d5-cc4f703b1c58\n");
  name = "Числовая константа";
  title = "";
  isInvocable = false;

  initShape = {val: 0};

  async invoke(self: Machine, params: any[]): Promise<number[]> {
    return [self.state.val as number];
  }

  content = (self: Machine) => {
    return (
        <InputField
            value={self.state.val}
            onChange={ev =>
                (self.state.val = !Number.isNaN(+ev.target.value)
                    ? +ev.target.value
                    : self.state.val)
            }
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
