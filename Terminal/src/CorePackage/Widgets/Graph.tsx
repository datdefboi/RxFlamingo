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
        const maxX = values[values.length - 1].x;
        const rangeX = Math.abs(maxX - minX);

        ctx.strokeStyle = "white";
        ctx.beginPath();

        let minY = Number.MAX_VALUE;
        values.forEach((e) => {
          if (e.y < minY) minY = e.y;
        });
        let maxY = Number.MIN_VALUE;
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <GraphCanvas ref={ref} width={width} height={height} />
      </div>
    ));
  };
}

const GraphCanvas = styled.canvas`
  border-left: 1px solid ${(p) => p.theme.strain.border};
`;
