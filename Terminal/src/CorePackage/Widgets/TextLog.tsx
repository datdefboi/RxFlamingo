import SocketType from "../../App/Models/SocketType";
import MachinePrototype from "../../App/Models/MachinePrototype";
import UUID from "../../shared/UUID";
import PlayIcon from "mdi-react/PlayIcon";
import Machine from "../../App/Presenters/Machine/Machine";
import React from "react";
import styled from "styled-components";
import RecordData from "../../App/Models/Record";

export default class TextLog extends MachinePrototype {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: UUID.FromString("7690b191-7157-427e-9841-8f3576306e5b"),
      type: SocketType.Input,
    },
  ];

  id = UUID.FromString("c8941786-aaf1-4f57-b0a6-144a5a825ff8");
  name = "Журнал списком";
  title = "Журнал";

  initShape = { records: [] };

  async invoke(self: Machine, props: RecordData[]): Promise<null> {
    var record = props[0].value;
    self.state.records = [record, ...self.state.records];
    return null;
  }

  content = (self: Machine) => (
    <Container>
      {self.state.records.map((p: string) => (
        <LogRecord>
          <PlayIcon size={12} /> {p}
        </LogRecord>
      ))}
    </Container>
  );
}

const LogRecord = styled.div`
  color: white;
  font-family: Consolas;
`;

const Container = styled.div`
  width: 100px;
  height: 150px;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  margin: 4px;
  padding: 4px;
  overflow: auto;
`;
