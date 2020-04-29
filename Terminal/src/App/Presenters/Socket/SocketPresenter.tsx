import React, { useEffect, useRef, useState } from "react";
import SocketType from "../../Models/SocketType";
import { useStores } from "../../../Hooks/useStores";
import Point from "../../../shared/Point";
import Wire from "../Wire/Wire";
import Socket from "./Socket";
import useGlobalTheme from "../../../Hooks/useGlobalTheme";
import styled from "styled-components";
import UUID from "../../../shared/UUID";

export default ({ state }: { state: Socket }) => {
  const [isHover, setIsHover] = useState(false);

  const { appStore } = useStores();
  const factory = appStore.currentFactory;

  const ref = useRef<SVGSVGElement>(null);

  const theme = useGlobalTheme();

  function CapturePosition() {
    const rect = ref.current!.getBoundingClientRect();

    state.getPositionAction = function() {
      return new Point(
        rect.x + (state.type === SocketType.Output ? rect.width - 1 : 1),
        rect.y + rect.height / 2 + 1
      ).sub(factory.viewOffset);
    };
  }
  const pos = state.machine.position;
  const vPos = factory.viewOffset;

  useEffect(() => {
    CapturePosition();
  }, [pos.y, pos.x, vPos.x, vPos.y]);

  useEffect(() => {
    window.addEventListener("mousemove", TrackMouseMove);
    window.addEventListener("mouseup", EndLinking);
    return () => {
      window.removeEventListener("mousemove", TrackMouseMove);
      window.removeEventListener("mouseup", EndLinking);
    };
  }); // mouse handlers

  function isWirable(wire: Wire | null) {
    return (
      wire &&
      wire?.fromSocket?.type !== state.type &&
      (wire.fromSocket?.recordType === state.recordType ||
        state.recordType === null)
    );
  }

  const MouseEnter = () => {
    if (isWirable(factory.linkerWire)) setIsHover(true);
  };

  const MouseLeave = () => {
    console.log("leave");
    setIsHover(false);
  };

  const TryMakeWire = () => {
    if (isWirable(factory.linkerWire)) {
      const wire = factory.linkerWire;
      if (wire == null) return;

      factory.linkerWire = null;

      wire.toSocket = state;
      const to = wire.toSocket;

      to.currentWire = wire;

      const from = wire.fromSocket;

      from!.isDocked = true;
      from!.currentWire = wire;

      state.isDocked = true;

      from?.machine.wires.push(wire);
      state.machine.wires.push(wire);

      from?.machine.proto.onWireConnected(appStore, from.machine, wire);
      to?.machine.proto.onWireConnected(appStore, to.machine, wire);
    }
  };

  const TryBeginLinking = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    if (ev.button === 0) {
      const x = ev.clientX;
      const y = ev.clientY;

      const virtualSocket = new Socket(
        {
          type: state.type,
          title: "",
          typeID: state.recordType?.id ?? UUID.Empty,
          id: 0,
        },
        appStore,
        state.machine
      );

      virtualSocket.getPositionAction = () => new Point(x, y);

      if (!state.isDocked) {
        if (state.type === SocketType.Output)
          factory!.linkerWire = new Wire(state, virtualSocket);
        else factory!.linkerWire = new Wire(virtualSocket, state);
      } else {
        const wire = state.currentWire;
        appStore.removeWire(wire);

        factory!.linkerWire = new Wire(
          wire!.toSocket === state ? wire!.fromSocket : wire!.toSocket,
          virtualSocket
        );
      }
    }
  };

  const TrackMouseMove = (ev: MouseEvent) => {
    if (factory.linkerWire) {
      const x = ev.x;
      const y = ev.y;
      factory.linkerWire!.toSocket!.getPositionAction = () =>
        new Point(x, y).sub(factory.viewOffset);
    }
  };

  const EndLinking = () => {
    factory.linkerWire = null;
    CapturePosition();
  };

  const DockContainer = ({
    children,
    left,
    right,
  }: {
    children: React.ReactNode;
    left: number | string;
    right: number | string;
  }) => (
    <svg
      ref={ref}
      onMouseDown={TryBeginLinking}
      onMouseUp={TryMakeWire}
      style={{
        right,
        left,
        cursor: "crosshair",
        paddingTop: 2,
        position: "absolute",
      }}
      width="22"
      height="19"
      viewBox="0 0 22 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );

  const categoryColor = state.machine.color;
  console.log(state.title, categoryColor);

  return (
    <>
      {/* {isLinking ? <WireInst /> : null}*/}
      {state.type === SocketType.Output ? (
        <Container>
          <Label
            style={{
              marginRight: -8,
              position: "relative",
              backgroundColor: categoryColor,
              zIndex: 1,
            }}
          >
            {state.title}
            <LabelTypeAnnotation>{state.recordType?.name}</LabelTypeAnnotation>
          </Label>

          <svg
            style={{ position: "relative" }}
            width="20"
            height="25"
            viewBox="0 0 20 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 25L0 25L2.18557e-06 -1.74846e-06L20 0L20 3.125L14 7.5L14 17.5L20 21.875L20 25Z"
              fill={categoryColor}
            />
          </svg>

          <DockContainer right={-16} left={"auto"}>
            <path
              onMouseEnter={MouseEnter}
              onMouseLeave={MouseLeave}
              d="M0 4.50001L5.99998 3.8147e-06L22 4L22 15L5.99998 19L0 14.5L0 4.50001Z"
              fill={isHover ? theme.strain.dock : "transparent"}
            />
          </DockContainer>
        </Container>
      ) : (
        <Container>
          <DockContainer right={"auto"} left={-14}>
            <path
              onMouseEnter={MouseEnter}
              onMouseLeave={MouseLeave}
              d="M22 14.5L16 19L3.49691e-07 15L-5.96007e-07 4L16 1.56163e-06L22 4.5L22 14.5Z"
              fill={isHover ? theme.strain.dock : "transparent"}
            />
          </DockContainer>

          <svg
            width="20"
            height="25"
            viewBox="0 0 20 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H20V25H0V21.875L6 17.5V7.5L0 3.125V0Z"
              fill={categoryColor}
            />
          </svg>
          <Label style={{ marginLeft: -8, backgroundColor: categoryColor }}>
            {state.title}
            <LabelTypeAnnotation>{state.recordType?.name}</LabelTypeAnnotation>
          </Label>
        </Container>
      )}
    </>
  );
};

const LabelTypeAnnotation = styled.div`
  font-size: 8px;
  color: gray;
`;

const Label = styled.div`
  display: flex;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
  align-items: center;
  color: white;
  font-family: Arial;
  font-size: 10px;
`;

const Container = styled.div`
  display: flex;
  user-select: none;
`;
