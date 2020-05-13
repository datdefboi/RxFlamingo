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
import { stores } from "../../AppRoot/App";

interface State {
  data: number[];
  rows: number;
  columns: number;
}

export default class CsvFromFile extends MachinePrototype<State> {
  sockets = [
    {
      id: 0,
      title: "данные",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
    {
      id: 1,
      title: "линий",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
    {
      id: 2,
      title: "строк",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Output,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("c8942782-2af1-4f57-b0a6-144a5a825ff8");
  name = "Прочитать csv";
  title = "Данные из csv";

  initShape = { data: [], rows: 0, columns: 0 };

  async invoke(self: Machine<State>, params: RecordData[][]) {
    const t = stores.appStore.findRecordTypeByID(predefinedTypeIDs.number)!;
    return [
      self.state.data.map((p) => new RecordData(t, +p)),
      [new RecordData(t, self.state.rows)],
      [new RecordData(t, self.state.columns)],
    ];
  }

  content = (self: Machine<State>) => {
    function SetData(source: string) {
      let columns = 0;
      const map = source.split("\n").map((l) => {
        const row = l.split(",").map((p) => +p);
        columns = row.length;
        return row;
      });

      self.state.rows = map.length;
      self.state.columns = columns;
      self.state.data = map.flat();
    }

    return (
      <LogRecord>
        <Container
          type="file"
          onChange={async (ev) => {
            SetData(await ev.target.files!.item(0)!.text());
          }}
        />
      </LogRecord>
    );
  };
}

const Container = styled.input`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LogRecord = styled.div`
  color: white;
  font-family: Consolas;
  padding-left: 10px;
  padding-right: 10px;
`;
