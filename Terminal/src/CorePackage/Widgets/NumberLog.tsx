import SocketType from "../../App/Models/document/SocketType";
import MachinePrototype from "../../App/Models/document/MachinePrototype";
import UUID from "../../shared/UUID";
import PlayIcon from "mdi-react/PlayIcon";
import Machine from "../../App/Presenters/Machine/Machine";
import React from "react";
import styled from "styled-components";
import RecordData from "../../App/Models/execution/RecordData";
import { values } from "mobx";
import predefinedTypeIDs from "../../App/predefinedTypeIDs";

interface State {
  vals: number[];
}

export default class NumberLog extends MachinePrototype<State> {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("c8941786-aaf1-4f57-b0a6-144a5a825ff8");
  name = "Числовой вывод";
  title = "Числовой вывод";

  initShape = { vals: [] };

  async invoke(self: Machine<State>, params: RecordData[][]) {
    self.state.vals = params[0].map((p) => p.value);
    return [[]];
  }

  content = (self: Machine<State>) => (
    <LogContainer>
      {self.state.vals.map((p) => (
        <LogRecord>{p.toFixed(2)}</LogRecord>
      ))}
    </LogContainer>
  );
}

const LogContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 80px;
  overflow-y: scroll;
`;

const LogRecord = styled.div`
  color: white;
  font-family: Consolas;
  padding-left: 10px;
  padding-right: 10px;
  width: 60px;
`;
