import SocketType from "../../../App/Models/SocketType";
import UUID from "../../../shared/UUID";
import Machine from "../../../App/State/Machine/Machine";
import React from "react";
import MachinePrototype from "../../../App/Models/MachinePrototype";
import styled from "styled-components";

export default class TextLog extends MachinePrototype {
  sockets = [
    {
      id: 0,
      title: ">",
      type: SocketType.Input
    }
  ];

  id = UUID.FromString("c8941786-aaf1-4f57-b0a6-144a5a825ff8");
  name = "Журнал списком";
  title = "Журнал";

  initShape = {records: []};

  async invoke(self: Machine, props: string[][]) {
    var records = props[0];
    self.state.records = [...records, ...self.state.records];
  }

  content = (self: Machine) => (
      <Container>
        {self.state.records.map((p: string) => (
            <div>> {p}</div>
        ))}
      </Container>
  );
}

const Container = styled.div`
  width: 100px;
  height: 150px;
  border: solid 1px gray;
  margin: 4px;
  overflow: auto;
  border-radius: 8px;
`;
