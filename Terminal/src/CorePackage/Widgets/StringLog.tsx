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
  chars: string[];
}

export default class StringLog extends MachinePrototype<State> {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: predefinedTypeIDs.char,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("c8941786-a2f1-4f57-b0a6-144a5a825ff8");
  name = "Строковый вывод";
  title = "Строковый вывод";

  initShape = { chars: [] };

  async invoke(self: Machine<State>, params: RecordData[][]) {
    self.state.chars = params[0].map((p) => p.value);
    return [[]];
  }

  content = (self: Machine<State>) => (
    <LogContainer>
      {self.state.chars.map((p) => (
        <LogRecord>{p}</LogRecord>
      ))}
    </LogContainer>
  );
}

const LogContainer = styled.div`
  max-height: 80px;
  overflow-y: scroll;
`;

const LogRecord = styled.span`
  color: white;
  font-family: Consolas;
`;
