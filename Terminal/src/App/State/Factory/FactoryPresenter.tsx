import React, { useEffect, useState } from "react";
import Point from "../../../shared/Point";
import { useStores } from "../../../Hooks/useStores";
import UUID from "../../../shared/UUID";
import { useObserver } from "mobx-react-lite";
import { ContextMenuTrigger } from "react-contextmenu";
import Factory from "./Factory";
import styled from "styled-components";
import WirePresenter from "../Wire/WirePresenter";
import MachinePresenter from "../Machine/MachinePresenter";
import ContextMenu from "../../Components/ContextMenu/ContextMenu";
import SmartMenu from "../../Components/SmartMenu/SmartMenu";

export default ({ state }: { state: Factory }) => {
  const [viewDragOffset, setViewDragOffset] = useState(Point.Zero);
  const [isViewDrag, setIsViewDrag] = useState(false);

  const { appStore } = useStores();

  useEffect(() => {
    window.addEventListener("mousemove", OnGlobalMouseMove);
    window.addEventListener("mouseup", OnGlobalMouseUp);
    return () => {
      window.removeEventListener("mousemove", OnGlobalMouseMove);
      window.removeEventListener("mouseup", OnGlobalMouseUp);
    };
  }); // mouse handlers

  function OnMouseDown(ev: React.MouseEvent) {
    if (ev.button === 1 /*middle*/) {
      setIsViewDrag(true);
      setViewDragOffset(
        new Point(
          ev.clientX - state.viewOffset.x,
          ev.clientY - state.viewOffset.y
        )
      );
    }
  }

  function OnGlobalMouseUp(ev: MouseEvent) {
    if (isViewDrag) setIsViewDrag(false);
  }

  function OnGlobalMouseMove(ev: MouseEvent) {
    if (isViewDrag) {
      state.setViewOffset(
        new Point(ev.clientX - viewDragOffset.x, ev.clientY - viewDragOffset.y)
      );
    }
  }

  /*function GetLinerFromPoint() {
      const instance = factory.instances.find(
        p => p.id == factory.linkerWire?.fromId
      );
      const proto = factoryStore.machinePselfrototypes.find(p => p.id === instance!.id);

    }
  */

  return useObserver(() => (
    <ContextMenu
      Content={SmartMenu}
      Activator={mouseHandler =>
        useObserver(() => (
          <Container
            onDragOver={(ev: React.MouseEvent) => ev.preventDefault()}
            onMouseDown={OnMouseDown}
            onContextMenu={mouseHandler}
            style={{
              overflow: "hidden",
              backgroundPosition: `${state.viewOffset.x}px ${state.viewOffset.y}px`
            }}
          >
            <MovingContainer
              style={{
                transform: `translate(${state.viewOffset.x}px,${state.viewOffset.y}px)`
              }}
            >
              {state.instances.map(m => {
                return (
                  <>
                    <StrainContainer
                      style={{
                        zIndex: 4,
                        transform: `translate(${+m.position.x}px, ${
                          m.position.y
                        }px)`
                      }}
                      key={m.id.toString()}
                    >
                      <MachinePresenter state={m} />
                    </StrainContainer>
                    {m.wires
                      .filter(
                        p =>
                          p.fromSocket!.getPositionAction &&
                          p.toSocket?.machine === m
                      )
                      .map(wire => (
                        <WirePresenter key={wire.id.toString()} state={wire} />
                      ))}
                  </>
                );
              })}

              {state.linkerWire ? (
                <WirePresenter state={state.linkerWire} />
              ) : null}
            </MovingContainer>
          </Container>
        ))
      }
    />
  ));
};

const Container = styled.div`
  z-index: 0;
  height: 100vh;
  width: 100vw;
  position: relative;
  background-image: repeating-linear-gradient(
      transparent 0px,
      transparent ${p => p.theme.flow.step}px,
      ${p => p.theme.flow.border} ${p => p.theme.flow.step}px,
      ${p => p.theme.flow.border} ${p => p.theme.flow.step + 1}px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0px,
      ${p => p.theme.flow.background} ${p => p.theme.flow.step}px,
      ${p => p.theme.flow.border} ${p => p.theme.flow.step}px,
      ${p => p.theme.flow.border} ${p => p.theme.flow.step + 1}px
    );
`;

const MovingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  flex: 1;
`;

const StrainersWrap = styled.div`
  position: absolute;
  flex: 1;
`;

const StrainContainer = styled.div`
  position: absolute;
  display: block;
`;
