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
import { isArrayLike } from "mobx";

interface State {
  from: number;
  to: number;
  step: number;
  current: number;
}

export default class Range extends MachinePrototype<State> {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("ff1d3a76-3727-45ad-b3d5-cc4f703b1c58");
  name = "Последовательность";
  title = "Последовательно";
  isInvocable = false;

  initShape = { from: 0, to: 1, step: 0.2, current: 0 };

  async invoke(self: Machine<any>, params: RecordData[][]) {
    const numT = self.sockets[0].recordType!;
    const out = [];

    const from = self.state.from,
      to = self.state.to,
      step = self.state.step,
      rises = Math.sign(self.state.step) > 0;

    for (var i = from; i <= to; i += step) out.push(new RecordData(numT, i));
    return [out];
  }

  content = (self: Machine<State>) => {
    return (
      <div
        style={{
          color: "white",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <div>
          от
          <Inp
            style={{ width: 30 }}
            onMouseDown={(ev) => ev.stopPropagation()}
            value={self.state.from}
            onChange={(ev) => (self.state.from = +ev.target.value)}
          />
        </div>
        <div>
          с шагом
          <Inp
            style={{ width: 30 }}
            onMouseDown={(ev) => ev.stopPropagation()}
            value={self.state.step}
            onChange={(ev) => (self.state.step = +ev.target.value)}
          />
        </div>
        <div>
          до
          <Inp
            style={{ width: 30 }}
            onMouseDown={(ev) => ev.stopPropagation()}
            value={self.state.to}
            onChange={(ev) => (self.state.to = +ev.target.value)}
          />
        </div>
      </div>
    );
  };
}

const Inp = styled.input`
  margin: 4px;
`;

const ValueWrap = styled.div`
  color: white;
  padding: 4px;
  width: 30px;
`;
