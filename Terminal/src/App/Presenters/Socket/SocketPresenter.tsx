import React, { useEffect, useRef, useState } from "react";
import SocketType from "../../Models/document/SocketType";
import { useStores } from "../../../Hooks/useStores";
import Point from "../../../shared/Point";
import Wire from "../Wire/Wire";
import Socket from "./Socket";
import useGlobalTheme from "../../../Hooks/useGlobalTheme";
import styled from "styled-components";
import UUID from "../../../shared/UUID";
import { stores } from "../../../AppRoot/App";

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

  function isLinkable(wire: Wire | null) {
    return (
      wire &&
      (wire.toSocket?.recordType === state.recordType ||
        wire.fromSocket?.recordType === state.recordType ||
        state.recordType === stores.appStore.findRecordTypeByID(UUID.Empty))
    );
  }

  const MouseEnter = () => {
    if (isLinkable(factory.linkerWire)) setIsHover(true);
  };

  const MouseLeave = () => {
    setIsHover(false);
  };

  const TryMakeWire = () => {
    if (isLinkable(factory.linkerWire)) {
      const wire = factory.linkerWire;
      if (wire == null) return;

      factory.linkerWire = null;

      let real = null;

      if (wire.toSocket?.isVirtual) {
        wire.toSocket = state;
        real = wire.fromSocket;
      } else {
        wire.fromSocket = state;
        real = wire.toSocket;
      }

      state!.currentWire = wire;
      state!.machine = state.machine;
      state!.isVirtual = false;

      real!.isDocked = true;
      real!.currentWire = wire;

      state!.isDocked = true;

      real!.machine.wires.push(wire);
      state!.machine.wires.push(wire);

      real?.machine.proto.onWireConnected(real.machine, wire);
      state?.machine.proto.onWireConnected(state.machine, wire);
    }
  };

  const TryBeginLinking = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    if (ev.button === 0) {
      const virtualSocket = new Socket(
        {
          type:
            state.type == SocketType.Input
              ? SocketType.Output
              : SocketType.Input,
          title: "",
          typeID: state.recordType?.id ?? UUID.Empty,
          id: 0,
          showTypeAnnotation: false,
        },
        state.machine,
        true
      );

      ev.persist();
      virtualSocket.getPositionAction = () =>
        new Point(+ev.clientX, +ev.clientY);

      if (!state.isDocked) {
        if (state.type === SocketType.Output) {
          factory!.linkerWire = new Wire(state, virtualSocket);
        } else {
          factory!.linkerWire = new Wire(virtualSocket, state);
        }
      } else {
        const wire = state.currentWire;
        const real =
          state.type == SocketType.Input ? wire!.fromSocket : wire!.toSocket;

        appStore.removeWire(wire);
        virtualSocket.type = state.type;

        if (state.type === SocketType.Input) {
          factory!.linkerWire = new Wire(real, virtualSocket);
        } else {
          factory!.linkerWire = new Wire(virtualSocket, real);
        }
      }
    }
  };

  const TrackMouseMove = (ev: MouseEvent) => {
    if (factory.linkerWire) {
      var setter = function() {
        return new Point(ev.clientX, ev.clientY).sub(factory.viewOffset);
      };
      if (factory.linkerWire.toSocket?.isVirtual) {
        factory.linkerWire!.toSocket!.getPositionAction = setter;
      } else {
        factory.linkerWire!.fromSocket!.getPositionAction = setter;
      }
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
            {state.showAnnotation ? (
              <LabelTypeAnnotation>
                {state.recordType?.name}
              </LabelTypeAnnotation>
            ) : null}
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
            {state.showAnnotation ? (
              <LabelTypeAnnotation>
                {state.recordType?.name}
              </LabelTypeAnnotation>
            ) : null}
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
