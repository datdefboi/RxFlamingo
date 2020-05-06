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
import SocketType from "../../Models/document/SocketType";
import Machine from "./Machine";
import { useStores } from "../../../Hooks/useStores";
import ChevronDoubleRightIcon from "mdi-react/ChevronDoubleRightIcon";
import PlayIcon from "mdi-react/PlayIcon";
import ContentSaveOutlineIcon from "mdi-react/ContentSaveOutlineIcon";
import ContentSaveMoveIcon from "mdi-react/ContentSaveMoveIcon";
import TrashIcon from "mdi-react/TrashCanIcon";

export default function BlockPresenter({
  state,
  children,
}: {
  children: ReactNode;
  state: Machine<any>;
}) {
  const [dragOffset, setDragOffset] = useState<Point | undefined>(undefined);
  const [isDrag, setIsDrag] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const { appStore } = useStores();

  useEffect(() => {
    window.addEventListener("mousemove", OnGlobalMouseMove);
    return () => {
      window.removeEventListener("mousemove", OnGlobalMouseMove);
    };
  }); // mouse handlers

  function OnGlobalMouseUp() {
    setIsDrag(false);
    console.log("mouse up");
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
      state.setPosition(
        new Point(ev.clientX - dragOffset!.x, ev.clientY - dragOffset!.y)
      );
    }
  }

  const barStyle = { backgroundColor: state.color };
  //chevron-triple-right step-forward-2 content-save-move content-save-outline
  return useObserver(() => (
    <BlockContainer
      onMouseUp={OnGlobalMouseUp}
      onMouseDown={OnMouseDown}
      ref={ref}
    >
      <TopBar style={barStyle}>{state.proto?.title}</TopBar>
      <DocksContainer>{children}</DocksContainer>
      <BottomBar style={barStyle}>
        <ToolStripContainer>{state.proto.toolstrip(state)}</ToolStripContainer>
        {/* state.proto.isInvocable */ true ? (
          <div
            style={{ display: "flex", alignItems: "center" }}
            onMouseDown={(ev) => ev.stopPropagation()}
          >
            <TrashIcon
              onClick={(ev) => {
                appStore.removeInstance(state);
              }}
              size={16}
            />
            {/*   {state.cacheOut ? (
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
            )} */}
            {state.sockets.find((p) => p.type == SocketType.Input) ==
            undefined ? (
              <PlayIcon
                onClick={async (ev) => {
                  ev.stopPropagation();
                  state.cache = null;
                  state.produce();
                }}
                size={16}
              />
            ) : null}

            <ChevronDoubleRightIcon size={16} />
          </div>
        ) : null}
      </BottomBar>
    </BlockContainer>
  ));
}

const ToolStripContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: auto;
  > * {
    margin: 8px 4px;
    color: gray;
  }
`;

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
  align-items: center;
  padding: 4px;
  color: gray;

  > div *:hover {
    color: white;
  }
`;
