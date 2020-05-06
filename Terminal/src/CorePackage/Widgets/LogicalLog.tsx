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
  val: boolean;
}

export default class LogicalLog extends MachinePrototype<State> {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: predefinedTypeIDs.bool,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("c8941786-2af1-4f57-b0a6-144a5a825ff8");
  name = "Логический вывод";
  title = "Логический вывод";

  initShape = { val: false };

  async invoke(self: Machine<any>, params: RecordData[][]) {
    const numT = self.sockets[0].recordType!;
    return params.map((p) => {
      if (p[0]) {
        var val = p[0].value;
        self.state.val = val;
      }
      return [new RecordData(numT, self.state.val)];
    });
  }

  content = (self: Machine<State>) => (
    <LogRecord>
      <input type={"checkbox"} checked={self.state.val} />
    </LogRecord>
  );
}

const LogRecord = styled.div`
  color: white;
  font-family: Consolas;
  padding-left: 10px;
  padding-right: 10px;
`;
