import React, {
  ReactChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import Wire from "../Wire/Wire";
import WireDock from "../Socket/Socket";
import Point from "../../../shared/Point";
import { useObserver } from "mobx-react-lite";
import SocketType from "../../Models/SocketType";
import Machine from "./Machine";
import { useStores } from "../../../Hooks/useStores";
import ChevronDoubleRightIcon from "mdi-react/ChevronDoubleRightIcon";
import PlayIcon from "mdi-react/PlayIcon";
import ContentSaveOutlineIcon from "mdi-react/ContentSaveOutlineIcon";
import ContentSaveMoveIcon from "mdi-react/ContentSaveMoveIcon";

export default function BlockPresenter({
  state,
  children,
}: {
  children: ReactNode;
  state: Machine;
}) {
  const [dragOffset, setDragOffset] = useState<Point | undefined>(undefined);
  const [isDrag, setIsDrag] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const { appStore } = useStores();

  useEffect(() => {
    window.addEventListener("mousemove", OnGlobalMouseMove);
    window.addEventListener("mouseup", OnGlobalMouseUp);
    return () => {
      window.removeEventListener("mousemove", OnGlobalMouseMove);
      window.removeEventListener("mouseup", OnGlobalMouseUp);
    };
  }); // mouse handlers

  function OnGlobalMouseUp(ev: MouseEvent) {
    setIsDrag(false);
  }

  function OnMouseDown(mEvent: React.MouseEvent) {
    if (!appStore.currentFactory.linkerWire) {
      setDragOffset(
        new Point(
          mEvent.clientX - state.position.x,
          mEvent.clientY - state.position.y
        )
      );
      setIsDrag(true);
    }
  }

  function OnGlobalMouseMove(ev: MouseEvent) {
    if (isDrag) {
      console.error(isDrag);
      state.setPosition(
        new Point(ev.clientX - dragOffset!.x, ev.clientY - dragOffset!.y)
      );
    }
  }

  const barStyle = { backgroundColor: state.color };
  //chevron-triple-right step-forward-2 content-save-move content-save-outline
  return useObserver(() => (
    <BlockContainer onMouseDown={OnMouseDown} ref={ref}>
      <TopBar style={barStyle}>{state.proto?.title}</TopBar>
      <DocksContainer>{children}</DocksContainer>
      <BottomBar onMouseDown={(ev)=>ev.stopPropagation()} style={barStyle}>
        {state.proto.isInvocable ? (
          <>
            {state.cacheOut ? (
              <ContentSaveMoveIcon
                onClick={() => (state.cacheOut = false)}
                style={{ color: "white" }}
                size={16}
              />
            ) : (
              <ContentSaveOutlineIcon
                onClick={() => (state.cacheOut = true)}
                size={16}
              />
            )}

            <PlayIcon
              onClick={(ev) => {
                ev.stopPropagation();
                state.playCurrent();
              }}
              size={16}
            />
            <ChevronDoubleRightIcon size={16} />
          </>
        ) : null}
      </BottomBar>
    </BlockContainer>
  ));
}

const BlockContainer = styled.div`
  userselect: "none";
`;

const DocksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  cursor: grab;
`;

const Bar = styled.div`
  flex: 0;
  user-select: none;
  color: white;
  font-family: Arial;
`;

const TopBar = styled(Bar)`
  border-radius: 4px 4px 0 0;
  font-size: 14px;
  padding: 4px;
  border-bottom: 1px ${(p) => p.theme.strain.border} solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial;
  color: gray;
`;

const BottomBar = styled(Bar)`
  border-radius: 0 0 4px 4px;
  border-top: 1px ${(p) => p.theme.strain.border} solid;
  display: flex;
  justify-content: flex-end;
  padding: 4px;
  color: gray;

  > *:hover {
    color: white;
  }
`;