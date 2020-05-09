import SocketType from "../../App/Models/document/SocketType";
import MachinePrototype from "../../App/Models/document/MachinePrototype";
import UUID from "../../shared/UUID";
import PlayIcon from "mdi-react/PlayIcon";
import Machine from "../../App/Presenters/Machine/Machine";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import RecordData from "../../App/Models/execution/RecordData";
import { values } from "mobx";
import Point from "../../shared/Point";
import predefinedTypeIDs from "../../App/predefinedTypeIDs";
import { useObserver } from "mobx-react-lite";

interface State {
  values: Point[];
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
}

export default class Graph extends MachinePrototype<State> {
  sockets = [
    {
      id: 0,
      title: "X",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
    {
      id: 1,
      title: "Y",
      typeID: predefinedTypeIDs.number,
      type: SocketType.Input,
      showTypeAnnotation: true,
    },
  ];

  id = UUID.FromString("c8841786-aaf1-4f57-b0a6-144a5a825ff8");
  name = "График";
  title = "График";

  initShape = {
    values: [],
    minX: 0,
    minY: 0,
    maxY: 0,
    maxX: 0,
  };

  async invoke(self: Machine<State>, params: RecordData[][]) {
    self.state.values = [];
    const len = params[0].length;
    for (let i = 0; i < len; i++)
      self.state.values.push(new Point(params[0][i].value, params[1][i].value));
    return [[]];
  }

  toolstrip = (self: Machine<State>) => <>Записей {self.state.values.length}</>;

  content = (self: Machine<State>) => {
    const ref = useRef<HTMLCanvasElement>(null);

    const height = 200;
    const width = 200;

    useEffect(() => {
      var ctx = ref.current?.getContext("2d")!;
      const values = self.state.values;
      if (values.length > 0) {
        const minX = values[0].x;
        self.state.minX = minX;

        const maxX = values[values.length - 1].x;
        self.state.maxX = maxX;

        const rangeX = Math.abs(maxX - minX);

        ctx.strokeStyle = "white";
        ctx.beginPath();

        let minY = Number.MAX_VALUE;
        self.state.minY = minY;
        values.forEach((e) => {
          if (e.y < minY) minY = e.y;
        });

        let maxY = Number.MIN_VALUE;
        self.state.maxY = maxY;
        values.forEach((e) => {
          if (e.y > maxY) maxY = e.y;
        });

        const rangeY = Math.abs(maxY - minY);
        console.log(values);

        for (let i = 0; i < values.length; i++) {
          const v = values[i];
          const x = ((v.x - minX) / rangeX) * width;
          const y = ((v.y - minY) / rangeY) * height;
          if (i == 0) ctx.moveTo(x, height - y);
          else ctx.lineTo(x, height - y);
        }

        ctx.stroke();
        return () => ctx.clearRect(0, 0, width, height);
      }
    }, [self.state.values.length]);
    return useObserver(() => (
      <GraphContainer>
       {/*  <div style={{ gridRow: 1, gridColumn: 1, justifySelf: "end" }}>
          {self.state.maxY.toFixed(1)}
        </div>
        <div
          style={{
            alignSelf: "end",
            gridRow: 1,
            gridColumn: 1,
            justifySelf: "end",
          }}
        >
          {self.state.minY.toFixed(1)}
        </div>
        <div style={{ gridRow: 2, gridColumn: 2 }}>
          {self.state.minX.toFixed(1)}
        </div>
        <div style={{ justifySelf: "end", gridRow: 2, gridColumn: 2 }}>
          {self.state.maxY.toFixed(1)}
        </div> */}
        <GraphCanvas ref={ref} width={width} height={height} />
      </GraphContainer>
    ));
  };
}
const GraphContainer = styled.div`
  display: grid;
  grid-template-rows: auto 30px;
  grid-template-columns: 30px auto;
  color: gray;
  > * {
    margin: 2px;
  }
`;

const GraphCanvas = styled.canvas`
  grid-column-start: 2;
  grid-row-start: 1;
  border-left: 1px solid ${(p) => p.theme.strain.border};
  border-bottom: 1px solid ${(p) => p.theme.strain.border};
`;
