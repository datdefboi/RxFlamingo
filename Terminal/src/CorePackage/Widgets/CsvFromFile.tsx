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
  data: number[][];
}

export default class CsvFromFile extends MachinePrototype<State> {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: predefinedTypeIDs.bool,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("c8942782-2af1-4f57-b0a6-144a5a825ff8");
  name = "Прочитать csv";
  title = "Данные из csv";

  initShape = { data: [] };

  async invoke(
    self: Machine<any>,
    params: RecordData[][]
  ){
    return [[]];
  }

  content = (self: Machine<State>) => {
    function SetData(source: string) {
      self.state.data = source
        .split("\n")
        .map((l) => l.split(",").map((p) => +p));
    }

    return (
      <LogRecord>
        <input
          type="file"
          onChange={async (ev) => {
            SetData(await ev.target.files!.item(0)!.text());
          }}
        />
      </LogRecord>
    );
  };
}

const LogRecord = styled.div`
  color: white;
  font-family: Consolas;
  padding-left: 10px;
  padding-right: 10px;
`;
